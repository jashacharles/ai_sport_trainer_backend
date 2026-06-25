import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SQSClient,
  GetQueueAttributesCommand,
  ReceiveMessageCommand,
} from '@aws-sdk/client-sqs';

@Injectable()
export class SqsService implements OnModuleInit {
  private readonly logger = new Logger(SqsService.name);
  readonly client: SQSClient;
  readonly queueUrl: string;
  private polling = true;

  constructor(private config: ConfigService) {
    const endpoint = this.config.get<string>('SQS_ENDPOINT');
    this.queueUrl = this.config.get<string>('SQS_QUEUE_URL')!;

    this.client = new SQSClient({
      region: this.config.get<string>('AWS_REGION', 'us-east-1'),
      credentials: {
        accessKeyId: this.config.get<string>('AWS_ACCESS_KEY_ID', 'x'),
        secretAccessKey: this.config.get<string>('AWS_SECRET_ACCESS_KEY', 'x'),
      },
      ...(endpoint && { endpoint }),
    });
  }

  async onModuleInit() {
    try {
      const result = await this.client.send(
        new GetQueueAttributesCommand({
          QueueUrl: this.queueUrl,
          AttributeNames: ['ApproximateNumberOfMessages'],
        }),
      );
      const depth = result.Attributes?.ApproximateNumberOfMessages ?? '?';
      this.logger.log(`SQS connected — queue depth: ${depth}`);
    } catch (err) {
      this.logger.error('SQS connection failed', err);
      return;
    }

    this.startPolling();
  }

  private async startPolling() {
    this.logger.log('Polling queue for incoming tasks...');

    while (this.polling) {
      try {
        const response = await this.client.send(
          new ReceiveMessageCommand({
            QueueUrl: this.queueUrl,
            MaxNumberOfMessages: 10,
            WaitTimeSeconds: 20,
            VisibilityTimeout: 0, // peek only — task stays in queue for other backend
          }),
        );

        for (const message of response.Messages ?? []) {
          const body = JSON.parse(message.Body!);
          const record = body.Records?.[0];

          if (record) {
            const key: string = record.s3.object.key;
            const [userId, projectId, sessionId] = key.split('/');
            this.logger.log(
              `Task in queue → userId: ${userId} | projectId: ${projectId} | sessionId: ${sessionId}`,
            );
          }
        }
      } catch (err) {
        this.logger.error('Polling error', err);
        await new Promise((r) => setTimeout(r, 3000));
      }
    }
  }
}

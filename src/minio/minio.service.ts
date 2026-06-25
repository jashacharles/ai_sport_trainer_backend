import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class MinioService {
  private readonly logger = new Logger(MinioService.name);
  private readonly client: S3Client;
  private readonly bucket: string;

  constructor(private config: ConfigService) {
    this.bucket = this.config.get<string>('S3_BUCKET')!;
    this.client = new S3Client({
      region: this.config.get<string>('AWS_REGION', 'us-east-1'),
      endpoint: this.config.get<string>('S3_ENDPOINT'),
      forcePathStyle: true,
      credentials: {
        accessKeyId: this.config.get<string>('AWS_ACCESS_KEY_ID', 'test'),
        secretAccessKey: this.config.get<string>('AWS_SECRET_ACCESS_KEY', 'test'),
      },
    });
    this.logger.log(`S3 client connected → ${this.config.get('S3_ENDPOINT')}`);
  }

  async uploadFile(objectName: string, buffer: Buffer, mimeType: string) {
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: objectName,
        Body: buffer,
        ContentType: mimeType,
      }),
    );
    return objectName;
  }

  async getUploadUrl(objectName: string, expirySeconds = 3600): Promise<string> {
    return getSignedUrl(
      this.client,
      new PutObjectCommand({ Bucket: this.bucket, Key: objectName }),
      { expiresIn: expirySeconds },
    );
  }

  async getFileUrl(objectName: string, expirySeconds = 3600): Promise<string> {
    return getSignedUrl(
      this.client,
      new GetObjectCommand({ Bucket: this.bucket, Key: objectName }),
      { expiresIn: expirySeconds },
    );
  }

  async deleteFile(objectName: string) {
    await this.client.send(
      new DeleteObjectCommand({ Bucket: this.bucket, Key: objectName }),
    );
  }
}
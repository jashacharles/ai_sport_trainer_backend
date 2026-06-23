import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

@Injectable()
export class MinioService implements OnModuleInit {
  private readonly logger = new Logger(MinioService.name);
  private client: Minio.Client;
  private bucket: string;

  constructor(private config: ConfigService) {
    this.bucket = this.config.get<string>('MINIO_BUCKET')!;
    this.client = new Minio.Client({
      endPoint: this.config.get<string>('MINIO_ENDPOINT', 'localhost'),
      port: parseInt(this.config.get<string>('MINIO_PORT', '9000')),
      useSSL: this.config.get<string>('MINIO_USE_SSL') === 'true',
      accessKey: this.config.get<string>('MINIO_ACCESS_KEY')!,
      secretKey: this.config.get<string>('MINIO_SECRET_KEY')!,
    });
  }

  async onModuleInit() {
    const exists = await this.client.bucketExists(this.bucket);
    if (!exists) {
      await this.client.makeBucket(this.bucket);
      this.logger.log(`Bucket "${this.bucket}" created`);
    } else {
      this.logger.log(`Bucket "${this.bucket}" already exists`);
    }
  }

  async uploadFile(objectName: string, buffer: Buffer, mimeType: string) {
    await this.client.putObject(this.bucket, objectName, buffer, buffer.length, {
      'Content-Type': mimeType,
    });
    return objectName;
  }

  async getUploadUrl(objectName: string, expirySeconds = 3600): Promise<string> {
    return this.client.presignedPutObject(this.bucket, objectName, expirySeconds);
  }

  async getFileUrl(objectName: string, expirySeconds = 3600): Promise<string> {
    return this.client.presignedGetObject(this.bucket, objectName, expirySeconds);
  }

  async deleteFile(objectName: string) {
    await this.client.removeObject(this.bucket, objectName);
  }
}

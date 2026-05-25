import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WalrusService {
  private readonly logger = new Logger(WalrusService.name);
  private readonly publisherUrl: string;
  private readonly aggregatorUrl: string;

  constructor(private readonly config: ConfigService) {
    this.publisherUrl = this.config.getOrThrow<string>('WALRUS_PUBLISHER_URL');
    this.aggregatorUrl = this.config.getOrThrow<string>('WALRUS_AGGREGATOR_URL');
  }

  /** Store encrypted data on Walrus. Returns the blob ID. */
  async store(_data: Buffer): Promise<string> {
    // TODO: PUT ${this.publisherUrl}/v1/blobs?epochs=52
    // Retry with exponential backoff (3 attempts: 1s, 2s, 4s)
    return '';
  }

  /** Retrieve a blob from Walrus by its ID. */
  async retrieve(_blobId: string): Promise<Buffer> {
    // TODO: GET ${this.aggregatorUrl}/v1/blobs/${blobId}
    // Retry with exponential backoff
    return Buffer.alloc(0);
  }
}

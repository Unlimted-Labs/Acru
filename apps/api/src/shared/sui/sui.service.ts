import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SuiJsonRpcClient } from '@mysten/sui/jsonRpc';

@Injectable()
export class SuiService implements OnModuleInit {
  private client!: SuiJsonRpcClient;

  constructor(private readonly config: ConfigService) {}

  onModuleInit(): void {
    const url = this.config.getOrThrow<string>('SUI_RPC_URL');
    const networkEnv = this.config.get<string>('NEXT_PUBLIC_SUI_NETWORK', 'testnet');
    this.client = new SuiJsonRpcClient({
      url,
      network: networkEnv as 'mainnet' | 'testnet' | 'devnet' | 'localnet',
    });
  }

  getClient(): SuiJsonRpcClient {
    return this.client;
  }

  async getCurrentEpoch(): Promise<number> {
    // TODO: implement via client.getCurrentSystemState()
    return 0;
  }

  async getObject(_objectId: string): Promise<unknown> {
    // TODO: implement via client.getObject({ objectId })
    return null;
  }

  async getOwnedObjects(_address: string): Promise<unknown[]> {
    // TODO: implement via client.listOwnedObjects({ address })
    return [];
  }

  async queryEvents(_filter: unknown, _cursor?: unknown): Promise<unknown> {
    // TODO: implement
    return { data: [], hasNextPage: false };
  }

  async buildAndSubmitPTB(_tx: unknown, _signerAddress: string): Promise<unknown> {
    // TODO: implement — sign with session key from Supabase, submit PTB
    return null;
  }
}

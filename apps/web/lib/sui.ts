import { SuiJsonRpcClient } from '@mysten/sui/jsonRpc';

const network = (process.env['NEXT_PUBLIC_SUI_NETWORK'] ?? 'testnet') as
  | 'mainnet'
  | 'testnet'
  | 'devnet'
  | 'localnet';

export const suiClient = new SuiJsonRpcClient({
  url: process.env['NEXT_PUBLIC_SUI_RPC_URL'] ?? 'https://fullnode.testnet.sui.io:443',
  network,
});

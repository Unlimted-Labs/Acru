import { SealClient } from '@mysten/seal';
import { suiClient } from './sui';

export const sealClient = new SealClient({
  suiClient,
  serverConfigs: [],
  verifyKeyServers: false,
});

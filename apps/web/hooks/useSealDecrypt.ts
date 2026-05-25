'use client';

import { useState, useCallback } from 'react';
import { sealClient } from '../lib/seal';

export function useSealDecrypt() {
  const [isDecrypting, setIsDecrypting] = useState(false);

  const decrypt = useCallback(async (encryptedData: Uint8Array, sessionKey: unknown): Promise<Uint8Array | null> => {
    setIsDecrypting(true);
    try {
      // TODO: call sealClient.decrypt({ encryptedData, sessionKey })
      return null;
    } catch {
      return null;
    } finally {
      setIsDecrypting(false);
    }
  }, []);

  return { decrypt, isDecrypting };
}

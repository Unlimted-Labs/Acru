'use client';

import { useState } from 'react';
import { useToast } from './useToast';

export type TransactionStatus = 'idle' | 'building' | 'signing' | 'submitting' | 'confirming' | 'success' | 'error';

export function useTransaction() {
  const [status, setStatus] = useState<TransactionStatus>('idle');
  const [txDigest, setTxDigest] = useState<string | null>(null);
  const { toast } = useToast();

  const execute = async (fn: () => Promise<{ digest?: string }>) => {
    setStatus('building');
    try {
      setStatus('signing');
      const result = await fn();
      setStatus('confirming');
      // TODO: poll for transaction confirmation via suiClient
      setStatus('success');
      if (result.digest) setTxDigest(result.digest);
      toast.success('Transaction confirmed');
      return result;
    } catch (err) {
      setStatus('error');
      toast.error(err instanceof Error ? err.message : 'Transaction failed');
      throw err;
    }
  };

  const reset = () => { setStatus('idle'); setTxDigest(null); };

  return { status, txDigest, execute, reset, isLoading: status !== 'idle' && status !== 'success' && status !== 'error' };
}

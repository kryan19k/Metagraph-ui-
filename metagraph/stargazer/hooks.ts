import { useState, useCallback } from 'react';
import { dag4 } from '@stardust-collective/dag4';

export const useStargazerWallet = () => {
  const [balance, setBalance] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const connect = useCallback(async (privateKey?: string) => {
    try {
      if (!privateKey) {
        throw new Error('Private key is required');
      }

      const account = dag4.createAccount();
      account.loginPrivateKey(privateKey);

      account.connect({
        networkVersion: '2.0',
        testnet: true // Set to false for mainnet
      });

      setAddress(account.address);

      const balanceResponse = await dag4.network.getAddressBalance(account.address);
      setBalance(balanceResponse.toString());

      return account;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  }, []);

  const sendDAG = useCallback(async (toAddress: string, amount: number, fee: number = 0) => {
    if (!address) {
      throw new Error('Wallet not connected');
    }

    try {
      const txHash = await dag4.account.transferDag(toAddress, amount, fee);
      return txHash;
    } catch (error) {
      console.error('Failed to send DAG:', error);
      throw error;
    }
  }, [address]);

  return { balance, address, connect, sendDAG };
};
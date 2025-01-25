import { networkConfig, suiClient } from './';
import type { User } from '../types';
import { Transaction } from '@mysten/sui/transactions';
import { MIST_PER_SUI } from '@mysten/sui/utils';

export function get_trans_add_balance(coinCount: number) {
    const tx = new Transaction();
    const [coin] = tx.splitCoins(tx.gas, [coinCount*Number(MIST_PER_SUI)]);
    tx.moveCall({
      package: networkConfig.testnet.variables.packageId,
      module: 'nygame',
      function: 'add_balance',
      arguments: [
        coin,
        tx.object(networkConfig.testnet.variables.stateId),
      ],
    });
  
    return tx;
}
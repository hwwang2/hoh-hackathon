import { networkConfig, suiClient } from './';
import type { User } from '../types';
import { Transaction } from '@mysten/sui/transactions';
import { MIST_PER_SUI } from '@mysten/sui/utils';
import { keccak256 } from '@/lib/utils';

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

export function get_trans_guess(gid: string, guess:string, coinCount: number) {
  const tx = new Transaction();
  const [coin] = tx.splitCoins(tx.gas, [coinCount*Number(MIST_PER_SUI)]);
  tx.moveCall({
    package: networkConfig.testnet.variables.packageId,
    module: 'nygame',
    function: 'add_balance',
    arguments: [
      tx.pure.string(gid),
      tx.pure.string(guess),
      tx.object(networkConfig.testnet.variables.stateId),
      coin,
    ],
  });

  return tx;
}

/**
 * gid: String, 
        sign: vector<u8>, 
        state: &mut State,
        _admin_cap: &AdminCap,
 */
export function get_trans_new_game(gid: string, word:string, nonce:string) {
  const tx = new Transaction();
  const sign = keccak256(gid+word+nonce);
  tx.moveCall({
    package: networkConfig.testnet.variables.packageId,
    module: 'nygame',
    function: 'new_game',
    arguments: [
      tx.pure.string(gid),
      tx.pure.vector('u8', sign),
      tx.object(networkConfig.testnet.variables.stateId),
      tx.object(networkConfig.testnet.variables.adminCap)
    ],
  });

  return tx;
}

export const COIN_NEED=[0.01, 0.1];
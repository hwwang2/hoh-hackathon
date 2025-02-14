'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  useCurrentAccount,
  ConnectButton,
} from '@mysten/dapp-kit'
import NewGame from './NewGame';
import AddBalance from './AddBalance';

export default function App() {
    const account = useCurrentAccount();

  if (!account) return (
    <div className='flex justify-center py-8'>
        <Card className='max-w-[450px]'>
        <CardHeader>
            <CardTitle>Wallet not connected!</CardTitle>
            <CardDescription>
            Please connect your wallet to continue!
            </CardDescription>
        </CardHeader>
        <CardContent>
            <ConnectButton />
        </CardContent>
        </Card>
    </div>
  );

  return (
    <div className='flex justify-center gap-4 py-8'>
      <AddBalance />
      <NewGame />
    </div>
  )
}
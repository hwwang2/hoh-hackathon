'use client';

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { get_trans_add_balance } from '@/contracts/nygame'
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  ConnectButton
} from '@mysten/dapp-kit'
import { LoaderCircle, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function CreateProfile() {
    const account = useCurrentAccount();
    const [isLoading, setIsLoading] = useState(false)
    const [value, setValue] = useState(0.0)

    const { toast } = useToast()
    const currentUser = useCurrentAccount()
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction()

    const disabledAddBalance = isLoading || !value;

    useEffect(() => {
    // queryUsers()
    //     .then((users) => setUsers(users))
    //     .catch((error) => console.error)
    }, []);
    const handleChange = (origin: string) => {
        // 使用正则表达式来确保只有数字被输入
        // const numericRegex = /^[0-9]*$/;
        const numericRegex = /\d+(\.\d+)?$/;
        const newValueIsNumeric = numericRegex.test(origin);
     
        if (newValueIsNumeric) {
          setValue(Number.parseFloat(origin));
        }
    };

  const handleAddBalance = async () => {
    if (!currentUser) {
      toast({
        title: 'Connect Wallet',
        description: 'Please connect wallet',
      })
      return
    }

    setIsLoading(true)

    const tx = get_trans_add_balance(value)
    signAndExecuteTransaction(
      {
        transaction: tx,
      },
      {
        onSuccess(data) {
          toast({
            title: 'Balance Added',
            description: "Digest: " + data.digest,
          })
          setIsLoading(false)
        },
        onError() {
          toast({
            title: 'Balance Add Failed',
            description: 'Balance Add Failed',
            variant: 'destructive',
          })
          setIsLoading(false)
        },
      },
    )
  }

  if (!account) return (
    <div className='flex justify-center'>
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
    <div className='flex justify-center'>
    <Card className='w-full max-w-[450px]'>
      <CardHeader>
        <CardTitle>NyGame Admin</CardTitle>
        <CardDescription>
          Manage your nygame.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <span className='font-semibold text-muted-foreground text-sm'>
              SUI to add:
            </span>
            <Input
              placeholder='Enter the count of sui you want to add'
              value={value}
              type='number'
              disabled={isLoading}
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className='justify-end gap-2'>
        <Button
          disabled={disabledAddBalance}
          onClick={handleAddBalance}
        >
          {!isLoading && <Plus className='size-4' />}
          {isLoading && <LoaderCircle className='size-4 animate-spin' />}
          Add Balance
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}
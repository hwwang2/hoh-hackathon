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
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { createProfileTx, queryUsers } from '@/contracts/resource-manage'
import type { User } from '@/types'
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
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [users, setUsers] = useState<User[]>([])

    const { toast } = useToast()
    const currentUser = useCurrentAccount()
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction()

    const disabledCreate = isLoading || !name || !description
    const userProfile = users.find(
    (user) => user.owner === currentUser?.address,
    )

    useEffect(() => {
    queryUsers()
        .then((users) => setUsers(users))
        .catch((error) => console.error)
    }, [])

  const handleCreateProfile = async () => {
    if (!currentUser) {
      toast({
        title: 'Connect Wallet',
        description: 'Please connect wallet',
      })
      return
    }

    setIsLoading(true)

    const tx = createProfileTx(name, description)
    signAndExecuteTransaction(
      {
        transaction: tx,
      },
      {
        onSuccess(data) {
          toast({
            title: 'Profile created',
            description: 'You can now view your profile',
          })
          setIsLoading(false)
        },
        onError() {
          toast({
            title: 'Create Profile Failed',
            description: 'Please try again',
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
  if(!!userProfile) return (
    <div className='flex justify-center'>
        <Card className=''>
        <CardHeader>
            <CardTitle>Profile!</CardTitle>
            <CardDescription>
            Profiles already created!
            </CardDescription>
        </CardHeader>
        <CardContent>
        {userProfile.profile}
        </CardContent>
        </Card>
    </div>
  );

  return (
    <div className='flex justify-center'>
    <Card className='w-full max-w-[450px]'>
      <CardHeader>
        <CardTitle>Create Profile</CardTitle>
        <CardDescription>
          Enter name and description and click create.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <span className='font-semibold text-muted-foreground text-sm'>
              Name
            </span>
            <Input
              placeholder='Enter your name'
              value={name}
              disabled={isLoading}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <span className='font-semibold text-muted-foreground text-sm'>
              Description
            </span>
            <Textarea
              placeholder='Enter your description'
              rows={4}
              value={description}
              disabled={isLoading}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className='justify-end gap-2'>
        <Button
          disabled={disabledCreate}
          onClick={handleCreateProfile}
        >
          {!isLoading && <Plus className='size-4' />}
          {isLoading && <LoaderCircle className='size-4 animate-spin' />}
          Create
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}
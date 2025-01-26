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
import { get_trans_new_game } from '@/contracts/nygame'
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  ConnectButton,
  useSuiClient
} from '@mysten/dapp-kit'
import { LoaderCircle, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { WordleDetail } from '@/types';
import { fetchData, sendPostRequestWithMultipartForm } from '@/lib/utils';

export default function NewGame() {
    const client = useSuiClient();
    const { toast } = useToast()
    const currentUser = useCurrentAccount()
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction()
    
    const [wordle, setWordle] = useState<WordleDetail>({id:"", word:"", nonce:"",guesses:[]});

    useEffect(() => {
    // queryUsers()
    //     .then((users) => setUsers(users))
    //     .catch((error) => console.error)
    }, []);
    const handleNewGame = async () => {
      
      const formData = new FormData();
      formData.append('action', 'new');
      sendPostRequestWithMultipartForm<WordleDetail>("/api/wordle", formData).then(res=>{
        setWordle(res);
      }).catch(err=>{
          console.log(err);
      });
    };

  const handleSubmitNewGame = async () => {
    if (!currentUser) {
      toast({
        title: 'Connect Wallet',
        description: 'Please connect wallet',
      })
      return
    }
    if(!wordle.id){
      return;
    }

    const tx = get_trans_new_game(wordle.id, wordle.word, wordle.nonce);
    signAndExecuteTransaction(
      {
        transaction: tx,
      },
      {
        onSuccess(data) {
          toast({
            title: 'New Game Submit',
            description: "Digest: " + data.digest,
          })
          client.waitForTransaction({
            digest: data.digest,
            options: {
              showEffects: true,
            }
          }).then(res=>{
            console.log(res);
            toast({
              title: res.effects?.status.status,
              description: res.effects?.status.error,
            })
          }).catch(err=>{
            toast({title:"Erro", description:err,variant: 'destructive',});
          }).finally(()=>{
            // setIsLoading(false)
          });
        },
        onError() {
          toast({
            title: 'New Game Submit Failed',
            variant: 'destructive',
          })
          // setIsLoading(false)
        },
      },
    )
  }

  return (
    <div className='flex justify-center'>
    <Card className='w-full max-w-[450px]'>
      <CardHeader>
        <CardTitle>New Game</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <span className='font-semibold text-muted-foreground text-sm'>
              ID:
            </span>
            <span className='font-semibold text-muted-foreground text-sm'>
              {wordle.id}
            </span>
          </div>
          <div className='space-y-2'>
            <span className='font-semibold text-muted-foreground text-sm'>
              word:
            </span>
            <span className='font-semibold text-muted-foreground text-sm'>
              {wordle.word}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className='justify-end gap-2'>
        <Button
          onClick={handleNewGame}
        >
          New Game
        </Button>
        <Button
          onClick={handleSubmitNewGame}
        >
          Submit To Chain!
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}
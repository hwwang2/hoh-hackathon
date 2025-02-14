'use client';

import { Button } from '@/components/ui/button'
import Link from 'next/link';
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
import { CompletedRow } from '@/components/wordle/CompletedRow';
type Props = {
  wordle:WordleDetail;
};
export default function GameCard({wordle}:Props) {
  function getTimesByLength(n:number){
    if(n==0) return "100X";
    if(n==1) return "10X";
    if(n==2) return "5X";
    if(n==3) return "3X";
    if(n==4) return "2X";
    if(n==5) return "1.25X";
    return "";
  }
  function getTitle(){
    if(wordle.overtime){
      return "Game Over!";
    }
    let x = getTimesByLength(wordle.guesses.length);
    return "Win "+x+" from wordle game!";
  }
  return (
    <div className='w-full md:w-1/2 p-4 items-center'>
    <Card className=''>
      <CardHeader>
        <CardTitle>{getTitle()}</CardTitle>
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
              Last Guess:
            </span>
            <span className='font-semibold text-muted-foreground text-sm'>
              {wordle.guesses.length>0? <CompletedRow guess={wordle.guesses[wordle.guesses.length-1]}/>:""}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className='justify-end gap-2'>
        <Link href={"./wordle/"+wordle.id}>
        <Button>
          Try to Win!
        </Button>
        </Link>
      </CardFooter>
    </Card>
    </div>
  )
}
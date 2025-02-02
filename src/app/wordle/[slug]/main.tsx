'use client'
import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Grid } from "@/components/wordle/Grid";
import { Keyboard } from "@/components/wordle/Keyboard";
import { InfoModal } from "../InfoModal";
import { isWordInWordList } from "@/components/wordle/words";
import { useToast } from '@/hooks/use-toast';
import { get_trans_guess, COIN_NEED, get_trans_draw_reward } from '@/contracts/nygame'
// import {getWordleById} from '@/lib/wordle';
import { WordleDetail } from "@/types";
import {fetchData} from "@/lib/utils";
import { Button } from '@/components/ui/button';
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient
} from '@mysten/dapp-kit'

export function MainBoard({ id }: { id: string }) {
  const account = useCurrentAccount();
  const client = useSuiClient();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction()
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [wordle, setWordle] = useState<WordleDetail>({id, word:"",nonce:"",guesses:[]});

  const { toast } = useToast();
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
    return "Play to WIN "+x;
  }
  const isWinner = ()=>{
    if(!account) return false;
    if(!wordle.word || !wordle.overtime) return false;
    wordle.guesses.forEach(wd=>{
      if(wd.guess.toUpperCase()==wordle.word.toUpperCase() && account.address==wd.user) return true;
    })
    return false;
  }

  const handleDrawPrize = ()=>{
    if(!wordle.overtime)
      return;
    let winIdx = -1;
    for(let i=0; i<wordle.guesses.length;i++){
      let gez = wordle.guesses[i];
      if(gez.guess==wordle.word){
        winIdx = i;
        break;
      }
    }
    if(winIdx==-1){
      return;
    }
    const tx = get_trans_draw_reward(id, wordle.nonce, winIdx);
    console.log(tx);
    signAndExecuteTransaction(
      {
        transaction: tx,
      },
      {
        onSuccess(data) {
          toast({
            title: 'Draw Submited',
            description: "Digest: " + data.digest,
          })
        },
        onError(err) {
          toast({
            title: 'Draw Failed',
            description: err.message,
            variant: 'destructive',
          })
        },
      },
    );
  }

  const fetchGuess = ()=>{
    fetchData<WordleDetail>("/api/wordle?id="+id).then(res=>{
        setWordle(res);
        // setGuesses(res.guesses);
        setGameOver(res.overtime!=null);
    }).catch(err=>{
        console.log(err);
    });
  }

  useEffect(() => {
    fetchGuess();
    const timer = setInterval(() => {
        fetchGuess();
      }, 10000);
    return () => clearInterval(timer);
  }, []);

  // useEffect(() => {
  //   if (isGameWon) {
  //   //   setIsWinModalOpen(true);
  //   }
  // }, [isGameWon]);

  const onChar = (value: string) => {
    if (currentGuess.length < 5 && wordle.guesses.length < 6) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const onEnter = () => {
    if (!isWordInWordList(currentGuess)) {
    //   setIsWordNotFoundAlertOpen(true);
    //   return setTimeout(() => {
    //     setIsWordNotFoundAlertOpen(false);
    //   }, 2000);
        toast({
            title: 'Word not found',
        });
        return;
    }
    if(!account){
      toast({
        title: 'Connect Wallet',
        description: 'Please connect wallet to login first!',
      })
      return;
    }
    if(gameOver){
      toast({
        title: 'Game Over!',
      })
      return;
    }

    const tx = get_trans_guess(id, currentGuess, COIN_NEED[wordle.guesses.length]);
    console.log(tx);
    signAndExecuteTransaction(
      {
        transaction: tx,
      },
      {
        onSuccess(data) {
          toast({
            title: 'Guess Submit',
            description: "Digest: " + data.digest,
          })
          client.waitForTransaction({
            digest: data.digest,
            options: {
              showEffects: true,
            }
          }).then(res=>{
            console.log(res);
            setCurrentGuess("");
            toast({
              title: res.effects?.status.status,
              description: res.effects?.status.error,
            })
          }).catch(err=>{
            toast({title:"Erro", description:err,variant: 'destructive',});
          }).finally(()=>{
            
          });
        },
        onError(err) {
          toast({
            title: 'Guess Failed',
            description: err.message,
            variant: 'destructive',
          })
        },
      },
    )
  };

  return (
    <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      {
      gameOver && <Alert>
        {/* <Terminal className="h-4 w-4" /> */}
        <AlertTitle>{isWinner()?"You Win!":"GAME OVER"}</AlertTitle>
        <AlertDescription>
        {`Game Over, the word was ${wordle.word}`}.
        </AlertDescription>
      </Alert>
      }
      <div className="flex w-80 mx-auto items-center mb-8">
        <h1 className="text-xl grow font-bold">
        {getTitle()}
        </h1>
        <InfoModal />
      </div>
      <Grid guesses={wordle.guesses} currentGuess={currentGuess} />
      {isWinner() && <Button onClick={handleDrawPrize}>
          Draw Prize!
        </Button>}
      {!gameOver && <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={wordle.guesses}
      />}
    </div>
  );
}

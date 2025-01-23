'use client'
// import { InformationCircleIcon } from "@heroicons/react/outline";
import { InfoIcon, Plus } from 'lucide-react'
import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Grid } from "@/components/wordle/Grid";
import { Keyboard } from "@/components/wordle/Keyboard";
// import { AboutModal } from "./components/modals/AboutModal";
import { InfoModal } from "./InfoModal";
// import { WinModal } from "./components/modals/WinModal";
import { isWordInWordList, isWinningWord, solution } from "@/components/wordle/words";
import { useToast } from '@/hooks/use-toast'

function App() {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameWon, setIsGameWon] = useState(false);
//   const [isWinModalOpen, setIsWinModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
//   const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);

  const { toast } = useToast()

  useEffect(() => {
    if (isGameWon) {
    //   setIsWinModalOpen(true);
    }
  }, [isGameWon]);

  const onChar = (value: string) => {
    if (currentGuess.length < 5 && guesses.length < 6) {
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
    }

    const winningWord = isWinningWord(currentGuess);

    if (currentGuess.length === 5 && guesses.length < 6 && !isGameWon) {
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess("");

      if (winningWord) {
        return setIsGameWon(true);
      }

      if (guesses.length === 5) {
        setIsGameLost(true);
        return setTimeout(() => {
          setIsGameLost(false);
        }, 2000);
      }
    }
  };

  return (
    <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      {
      isGameLost && <Alert>
        {/* <Terminal className="h-4 w-4" /> */}
        <AlertTitle>You lost!</AlertTitle>
        <AlertDescription>
        {`You lost, the word was ${solution}`}.
        </AlertDescription>
      </Alert>
      }
      <div className="flex w-80 mx-auto items-center mb-8">
        <h1 className="text-xl grow font-bold">Play wordle to earn!</h1>
        <InfoModal />
        {/* <InfoIcon
          className="h-6 w-6 cursor-pointer"
          onClick={() => setIsInfoModalOpen(true)}
        /> */}
      </div>
      <Grid guesses={guesses} currentGuess={currentGuess} />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
      />
      {/* <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      /> */}
      {/* <WinModal
        isOpen={isWinModalOpen}
        handleClose={() => setIsWinModalOpen(false)}
        guesses={guesses}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
      /> */}
    </div>
  );
}

export default App;

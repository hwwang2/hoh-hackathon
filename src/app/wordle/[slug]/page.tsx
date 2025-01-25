import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Grid } from "@/components/wordle/Grid";
import { Keyboard } from "@/components/wordle/Keyboard";
import { InfoModal } from "../InfoModal";
import { isWordInWordList, isWinningWord, solution } from "@/components/wordle/words";
import { useToast } from '@/hooks/use-toast';
import {getWordleById, generateWordle, updateWordleGuessById} from '@/lib/wordle';
import { WordleGuess } from "@/types";
import { MainBoard } from "./main";

async function App({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const id = (await params).slug;
    return (<MainBoard id={id} />);
}
export default App;

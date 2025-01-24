import { WordleDetail, WordleGuess } from "@/types";
import prisma from "./prisma";
import { WORDS } from "@/components/wordle/wordlist";
import {generateRandomString, keccak256 } from "./utils";
import { wordle } from "@prisma/client";

function setStatus(guesses: WordleGuess[], word: string){
    if(!guesses)
        return;
    guesses.forEach((ges) => {
        ges.guess.split("").forEach((letter, i) => {
          if (!word.includes(letter)) {
            // make status absent
            ges.status = "absent";
            return;
          }
    
          if (letter === word[i]) {
            //make status correct
            ges.status = "correct";
            return;
          }
    
          if (ges.status !== "correct") {
            //make status present
            ges.status = "present";
          }
        });
    });
}

export const getWordleById = async (id: string) => {
    const wd = await prisma.wordle.findUnique({
        where: {
            id: id,
        }
    });
    if(!wd){
        return null;
    }
    let wdl: WordleDetail = {
        id: wd.id,
        word: wd.word,
        nonce: wd.nonce,
        guesses: wd.guesses?JSON.parse(wd.guesses):[],
        overtime: wd.overtime
    }
    setStatus(wdl.guesses, wdl.word);
    return wdl;
};

export const generateWordle = async () => {
    let word = WORDS[Math.floor(Math.random() * WORDS.length)];
    let nonce = generateRandomString(10);
    const wd = await prisma.wordle.create({
        data: {
            word: word,
            nonce: nonce,
        },
    });
    let wdl: WordleDetail = {
        id: wd.id,
        word: wd.word,
        nonce: wd.nonce,
        guesses: wd.guesses?JSON.parse(wd.guesses):[],
        overtime: wd.overtime
    }
    setStatus(wdl.guesses, wdl.word);
    return wdl;
};

export const updateWordleGuessById = async (wdl: WordleDetail) => {
    return await prisma.wordle.update({
        where: {
          id: wdl.id,
        },
        data: {
          guesses: JSON.stringify(wdl.guesses),
        },
    })
}
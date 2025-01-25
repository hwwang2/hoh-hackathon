import { WordleGuess } from "@/types";
import { solution } from "./words";

export type CharStatus = "absent" | "present" | "correct";

export type CharValue =
  | "Q"
  | "W"
  | "E"
  | "R"
  | "T"
  | "Y"
  | "U"
  | "I"
  | "O"
  | "P"
  | "A"
  | "S"
  | "D"
  | "F"
  | "G"
  | "H"
  | "J"
  | "K"
  | "L"
  | "Z"
  | "X"
  | "C"
  | "V"
  | "B"
  | "N"
  | "M";

export function convertStatus(i:String) : CharStatus|undefined {
  if(!i){
    return undefined;
  }
  if(i=="1"){
    return "correct";
  }
  if(i=="2"){
    return "present";
  }
  return "absent";
}

export const getStatuses2 = (
  guesses: WordleGuess[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {};

  guesses.forEach((word) => {
    word.guess.split("").forEach((letter, i) => {
      if(word.status){
        let tmp = convertStatus(word.status[i]);
        if(tmp=="correct"){
          charObj[letter.toUpperCase()] = tmp;
        }
        if(tmp=="present"){
          if(charObj[letter.toUpperCase()]!="correct")
            charObj[letter.toUpperCase()] = tmp;
        }
        if(tmp=="absent"){
          charObj[letter.toUpperCase()] = tmp;
        }
      }
    });
  });

  return charObj;
};

export const getStatuses = (
  guesses: string[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {};

  guesses.forEach((word) => {
    word.split("").forEach((letter, i) => {
      if (!solution.includes(letter)) {
        // make status absent
        return (charObj[letter] = "absent");
      }

      if (letter === solution[i]) {
        //make status correct
        return (charObj[letter] = "correct");
      }

      if (charObj[letter] !== "correct") {
        //make status present
        return (charObj[letter] = "present");
      }
    });
  });

  return charObj;
};

export const getGuessStatuses = (guess: string): CharStatus[] => {
  const splitSolution = solution.split("");
  const splitGuess = guess.split("");

  const solutionCharsTaken = splitSolution.map((_) => false);

  const statuses: CharStatus[] = Array.from(Array(guess.length));

  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = "correct";
      solutionCharsTaken[i] = true;
      return;
    }
  });

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return;

    if (!splitSolution.includes(letter)) {
      // handles the absent case
      statuses[i] = "absent";
      return;
    }

    // now we are left with "present"s
    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    );

    if (indexOfPresentChar > -1) {
      statuses[i] = "present";
      solutionCharsTaken[indexOfPresentChar] = true;
      return;
    } else {
      statuses[i] = "absent";
      return;
    }
  });

  return statuses;
};

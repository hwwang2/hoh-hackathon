import { getGuessStatuses } from "./statuses";
import { Cell } from "./Cell";
import {WordleGuess} from "@/types"
import { CharStatus,convertStatus } from "./statuses";

type Props = {
  guess: WordleGuess;
};


export const CompletedRow = ({ guess }: Props) => {

  // const statuses = getGuessStatuses(guess);

  return (
    <div className="flex justify-center mb-1">
      {guess.guess.split("").map((letter, i) => (
        <Cell key={i} value={letter} status={convertStatus(guess.status?guess.status[i]:"")} />
      ))}
    </div>
  );
};

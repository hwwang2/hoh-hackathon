import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import { Cell } from "@/components/wordle/Cell";
import { Button } from '@/components/ui/button'
import { InfoIcon } from 'lucide-react'

export const InfoModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <InfoIcon className="h-6 w-6 cursor-pointer" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>How to play</DialogTitle>
        </DialogHeader>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-2 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
          <div>
            <div className="text-center">
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Guess the WORDLE in 6 tries. After each guess, the color
                  of the tiles will change to show how close your guess was
                  to the word.
                </p>

                <div className="flex justify-center mb-1 mt-4">
                  <Cell value="W" status="correct" />
                  <Cell value="E" />
                  <Cell value="A" />
                  <Cell value="R" />
                  <Cell value="Y" />
                </div>
                <p className="text-sm text-gray-500">
                  The letter W is in the word and in the correct spot.
                </p>

                <div className="flex justify-center mb-1 mt-4">
                  <Cell value="P" />
                  <Cell value="I" status="present" />
                  <Cell value="L" />
                  <Cell value="O" />
                  <Cell value="T" />
                </div>
                <p className="text-sm text-gray-500">
                  The letter L is in the word but in the wrong spot.
                </p>

                <div className="flex justify-center mb-1 mt-4">
                  <Cell value="V" />
                  <Cell value="A" />
                  <Cell value="G" />
                  <Cell value="U" status="absent" />
                  <Cell value="E" />
                </div>
                <p className="text-sm text-gray-500">
                  The letter U is not in the word in any spot.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

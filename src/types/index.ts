export interface Profile {
    id: string
    name: string
    description: string
}

export interface User {
    owner: string
    profile: string
}

export interface WordleGuess{
    guess: string,
    status: string,
}

export interface WordleDetail {
    id: string,
    word: string,
    nonce: string,
    guesses: WordleGuess[],
    overtime: Date
}
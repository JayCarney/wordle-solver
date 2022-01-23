export enum Result {
  Invalid,
  Orange,
  Green,
}

export interface LetterResult {
  letter: string
  result: Result
}

export type Guess = LetterResult[]


export function createGuessFromWord(word: string): Guess {
  return word.split('')
  .map((letter): LetterResult => {
    return {
      letter,
      result: Result.Invalid,
    }
  }) as Guess
}
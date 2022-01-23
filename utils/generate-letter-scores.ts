import { Guess } from "./create-guess-from-word";
import * as R from 'ramda'

export type LetterScores = Record<string, number>[]

export function generateLetterScrores(wordList: string[], guesses: Guess[] = []): LetterScores {
  const returnValue = Array(5)
  return wordList.reduce((acc, word): LetterScores => {
    word.split('').forEach((letter, index) => {
      const path = [index, letter]
      acc = R.assocPath(path, R.pathOr(0, path, acc) + 1, acc)
    })
    return acc
  }, [] as LetterScores)
}
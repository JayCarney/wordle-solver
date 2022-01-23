import { Guess } from "./create-guess-from-word";
import { LetterScores } from "./generate-letter-scores";
import * as R from 'ramda'

export function scoreWord(word: string, letterScores: LetterScores, guesses: Guess[] = []): number {
  return word.split('').reduce((score, letter, letterIndex) => {
    return score + R.pathOr(0, [letterIndex, letter], letterScores)
  }, 0)
}
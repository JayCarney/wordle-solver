import { Guess } from "./create-guess-from-word";
import { LetterScores } from "./generate-letter-scores";
import * as R from 'ramda'

const MATCH_POSITION_MULTIPLIER = 2
const MATCH_OTHER_WORDS_MULTIPLIER = 1

export function scoreWord(word: string, letterScores: LetterScores, guesses: Guess[] = []): number {
  const letterArray = word.split('')
  let charScore = 0
  // positional score
  charScore += letterArray.reduce((score, letter, letterIndex) => {
    return score + R.pathOr(0, ['positional', letterIndex, letter], letterScores) * MATCH_POSITION_MULTIPLIER
  }, 0)
  // matching words score
  charScore += R.uniq(letterArray).reduce((score, letter) => {
    return score + R.pathOr(0, ['inWord', letter], letterScores) * MATCH_OTHER_WORDS_MULTIPLIER
  }, 0)
  return charScore
}
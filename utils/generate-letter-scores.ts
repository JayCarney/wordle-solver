import { Guess } from "./create-guess-from-word";
import wordleDict from '../wordsDict.json'
import * as R from 'ramda'

export type ScoreDict = Record<string, number>
export interface LetterScores {
  inWord: ScoreDict
  positional: ScoreDict[]
}

const POSITIONAL_POINTS = 2
const IN_WORD_POINTS = 1

export function generateLetterScrores(availableWords: string[]): LetterScores {
  return availableWords.reduce((acc, word): LetterScores => {
    // if (!availableWords.includes(word)) {
    //   // word already filtered out
    //   return acc
    // }
    const letterArray = word.split('')
    // positinal score
    letterArray.forEach((letter, index) => {
      const path = ['positional', index, letter]
      acc = R.assocPath(path, R.pathOr(0, path, acc) + 1, acc)
    })
    // in word score
    R.uniq(letterArray).forEach(letter => {
      const path = ['inWord', letter]
      acc = R.assocPath(path, R.pathOr(0, path, acc) + 1, acc)
    })
    return acc
  }, {inWord: {}, positional:[]} as LetterScores)
}
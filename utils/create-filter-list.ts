import { Guess, Result } from "./create-guess-from-word"
import { Filter } from "./filter-word-list"
import { include, includeAtPosition, notInclude, notIncludeAtPosition, maxCharCount, minCharCount } from "./filters"
import * as R from 'ramda'

type FilterTuple = [result: Result, letter: string, filter: Filter]
type ResultLocation = {
  charIndex: number,
  result: Result
}
type LetterRegister = Record<string, ResultLocation[]>

export function createFilterList(guesses: Guess[]): Filter[] {
  const filters: Filter[] = []
  guesses.forEach((guess, guessIndex) => {
    const filtersFromGuess: FilterTuple[] = []
    const letterRegister: LetterRegister = {}
    guess.forEach((char, charIndex) => {
      const {letter, result} = char
      const path = [letter]
      const resultLocation = {
        charIndex,
        result,
      }
      
      if (!Object.hasOwnProperty.call(letterRegister, letter)) {
        letterRegister[letter]=[]
      }
      
      letterRegister[letter].push(resultLocation)
    })
    for (const [letter, results] of Object.entries(letterRegister)) {
      const maxCharCountReached = results.some(result => result.result === Result.Invalid)
      const cleanedResults = results.filter(result => result.result !== Result.Invalid)
      
      // min/max filters
      if (maxCharCountReached) {
        filters.push(maxCharCount(letter, cleanedResults.length))
      } else {
        filters.push(minCharCount(letter, cleanedResults.length))
      }
      
      // positional filters
      results.forEach(resultItem => {
        const {result, charIndex} = resultItem
        switch (result) {
          case Result.Green:
            filters.push(includeAtPosition(letter, charIndex))
            break
          case Result.Orange:
            filters.push(notIncludeAtPosition(letter, charIndex))
            break
        }
      })
    }
  })
  return filters
}
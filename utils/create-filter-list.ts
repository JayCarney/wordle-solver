import { Guess, Result } from "./create-guess-from-word"
import { Filter } from "./filter-word-list"
import { include, includeAtPosition, notInclude, notIncludeAtPosition, maxCharCount, minCharCount } from "./filters"

type FilterTuple = [result: Result, letter: string, filter: Filter]

export function createFilterList(guesses: Guess[]): Filter[] {
  const filters: FilterTuple[] = []
  guesses.forEach((guess, guessIndex) => {
    const filtersFromGuess: FilterTuple[] = []
    guess.forEach((char, charIndex) => {
      const {letter, result} = char
      switch (result) {
        case Result.Green:
          filters.push([Result.Green, letter, includeAtPosition(letter, charIndex)])
          break
        case Result.Orange:
          filters.push([Result.Orange, letter, minCharCount(letter, 1)], [Result.Orange, letter, notIncludeAtPosition(letter, charIndex)])
          break
        default:
          filters.push([Result.Invalid, letter, notInclude(letter)])
      }
    })
  })
  // create a list of all characters we've found so far
  const foundLetters = filters.filter(([result]) => result !== Result.Invalid).map(([_, c]) => c)
  return filters
  .filter(([result,char,f]) => {
    // remove notInclude calls to lettters that found to offset duplicate char stuff, I'm too dumb to do this properly
    return result !== Result.Invalid || !foundLetters.includes(char)
  })
  .map(([r, c, filter]) => filter)
}
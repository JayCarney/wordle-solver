import { includes } from "ramda"
import { includeAtPosition, notInclude, notIncludeAtPosition } from "../utils/filters"
import {filterWordList} from '../utils/filter-word-list'
import { loadWordlist } from "../utils/load-words"

describe('example workflow', () => {
  test('solving a basic word', () => {
    let words = loadWordlist()?.slice(0)
    const roundOneFilters = [
      notInclude('a'),
      notInclude('t'),
      notInclude('o'),
      notInclude('r'),
      includes('c'),
      notIncludeAtPosition('c', 1)
    ]
    if (!words) {
      throw 'Could not load words'
    }
    words = filterWordList(words, roundOneFilters)

    const roundTwoFilters = [
      notInclude('b'),
      notInclude('l'),
      notInclude('h'),
      includes('e'),
      notIncludeAtPosition('e', 1),
      includeAtPosition('c', 3)
    ]
    words = filterWordList(words, roundTwoFilters)

    const roundThreeFilters = [
      notInclude('p'),
      notInclude('s'),
      includes('i'),
      notIncludeAtPosition('e', 0),
      notIncludeAtPosition('i', 2),
    ]

    words = filterWordList(words, roundThreeFilters)

    const roundFourFilters = [
      notInclude('m'),
      includeAtPosition('i', 1),
      includeAtPosition('n', 2),
      includeAtPosition('e', 4)
    ]

    words = filterWordList(words, roundFourFilters)
    console.log(words)
    expect(Array.isArray(words)).toBeTruthy()
  })
})
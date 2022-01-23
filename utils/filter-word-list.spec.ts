import { filterWordList } from "./filter-word-list"
import { include, includeAtPosition } from "./filters"

describe('filterWordList', () => {
  const testFilters = [
    include('a'),
    includeAtPosition('b', 0)
  ]
  test('returns only matching words', () => {
    expect(filterWordList(['foo', 'bar'], testFilters)).toEqual(['bar'])
  })

  test('returns empty array with no matches', () => {
    expect(filterWordList(['foo', 'test'], testFilters)).toEqual([])
  })
})
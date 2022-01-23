import { mocked } from "ts-jest/dist/utils/testing"
import { createFilterList } from "./create-filter-list"
import { Guess, Result } from "./create-guess-from-word"
import { include, includeAtPosition, notInclude, notIncludeAtPosition, maxCharCount, minCharCount } from "./filters"
jest.mock('./filters')

const mockedNotInclude = mocked(notInclude)
const mockedInclude = mocked(include)
const mockedIncludeAtPosition = mocked(includeAtPosition)
const mockedNotIncludeAtPosition = mocked(notIncludeAtPosition)
const mockedMaxCharCount = mocked(maxCharCount)
const mockedMinCharCount = mocked(minCharCount)
// @ts-ignore I dont give AF
mockedInclude.mockImplementation((letter, word) => `include:${letter}`)
// @ts-ignore I dont give AF
mockedNotInclude.mockImplementation((letter, word) => `notInclude:${letter}`)
// @ts-ignore I dont give AF
mockedIncludeAtPosition.mockImplementation((letter, location, word) => `includeAtPosition:${letter}:${location}`)
// @ts-ignore I dont give AF
mockedNotIncludeAtPosition.mockImplementation((letter, location, word) => `notIncludeAtPosition:${letter}:${location}`)
// @ts-ignore I dont give AF
mockedMaxCharCount.mockImplementation((letter, count, word) => `maxCharCount:${letter}:${count}`)
// @ts-ignore I dont give AF
mockedMinCharCount.mockImplementation((letter, count, word) => `minCharCount:${letter}:${count}`)

describe('createFilterList', () => {
  test('returns empty array with empty gusses', () => {
    expect(createFilterList([])).toStrictEqual([])
  })
  test('returns minCharCount for match', () => {
    const guess: Guess = [{letter: 'a', result: Result.Orange}]
    expect(createFilterList([guess])).toStrictEqual(['minCharCount:a:1', 'notIncludeAtPosition:a:0'])
  })
  test('returns minCharCount of two when valid', () => {
    const guess: Guess = [{letter: 'a', result: Result.Orange}, {letter: 'a', result: Result.Orange}]
    expect(createFilterList([guess])).toStrictEqual(['minCharCount:a:2', 'notIncludeAtPosition:a:0', 'notIncludeAtPosition:a:1'])
  })
  test('creates exclude function for character', () => {
    const guess: Guess = [{letter: 'a', result: Result.Invalid}]
    expect(createFilterList([guess])).toStrictEqual(['notInclude:a'])
  })
  test('creates max character count for character', () => {
    const guess: Guess = [{letter: 'a', result: Result.Invalid}, {letter: 'a', result: Result.Green}]
    expect(createFilterList([guess])).toStrictEqual(['maxCharCount:a:1', 'includeAtPosition:a:1'])
  })
  test('handles missplaces second character', () => {
    const guess: Guess = [{letter: 'a', result: Result.Orange}, {letter: 'a', result: Result.Green}]
    expect(createFilterList([guess])).toEqual(['includeAtPosition:a:1', 'notIncludeAtPosition:a:0', 'minCharCount:a:2'])
  })
})
import { sortWords } from "./sort-words"

describe('sortWords', () => {
  test('words are sorted based on overlap', () => {
    expect(sortWords(['aaa', 'bbb', 'ccc', 'abc'])).toStrictEqual(['abc', 'aaa', 'bbb', 'ccc'])
  })
})
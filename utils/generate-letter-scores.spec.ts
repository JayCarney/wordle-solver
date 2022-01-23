import { generateLetterScrores } from "./generate-letter-scores"
import wordleDict from '../wordsDict.json'
import { mocked } from "ts-jest/dist/utils/testing"
jest.mock('../wordsDict.json')

const mockedWordsDict = mocked(wordleDict)
describe('generateLetterScrores', () => {
  test('positional score counts align with number of matching characters', () => {
    mockedWordsDict.answers = ['te', 'tr']
    expect(generateLetterScrores(['te', 'tr']).positional).toStrictEqual([{t: 2}, {e: 1, r: 1}])
  })

  test('inWord score counts align with number of matching words', () => {
    mockedWordsDict.answers = ['te', 'tt']
    expect(generateLetterScrores(['te', 'tt']).inWord).toStrictEqual({t: 2, e: 1})
  })

  test('filtered out answers don\'t count', () => {
    mockedWordsDict.answers = ['te', 'tr']
    expect(generateLetterScrores(['te']).inWord).toStrictEqual({t: 1, e: 1})
  })
})
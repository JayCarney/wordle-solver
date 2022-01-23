import { generateLetterScrores } from "./generate-letter-scores"

describe('generateLetterScrores', () => {
  test('returns a list of counted letters', () => {
    expect(generateLetterScrores(['te', 'tr'])).toStrictEqual([{t: 2}, {e: 1, r: 1}])
  })
})
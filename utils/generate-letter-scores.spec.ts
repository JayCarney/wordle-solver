import { generateLetterScrores } from "./generate-letter-scores"

describe('generateLetterScrores', () => {
  test('positional score counts align with number of matching characters', () => {
    expect(generateLetterScrores(['te', 'tr']).positional).toStrictEqual([{t: 2}, {e: 1, r: 1}])
  })

  test('inWord score counts align with number of matching words', () => {
    expect(generateLetterScrores(['te', 'tt']).inWord).toStrictEqual({t: 2, e: 1})
  })
})
import { scoreWord } from "./score-word"

describe('scoreWord', () => {
  test('Returns count of letter scores', () => {
    expect(scoreWord('te', [{t: 2},{}])).toBe(2)
  })
})
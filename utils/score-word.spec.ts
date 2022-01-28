import { scoreWord } from "./score-word"

describe('scoreWord', () => {
  test('Returns count of letter scores', () => {
    expect(scoreWord('te', {inWord: {t: 1, e: 1}, positional: [{t: 1}, {e: 1}]})).toBe(6)
  })
  test('Only scores the first instance of a word match by letter', () => {
    expect(scoreWord('tt', {inWord: {t: 1}, positional: []})).toBe(1)
  })
  test('Only scores the highest instance of a word match by position', () => {
    expect(scoreWord('tt', {inWord: {}, positional: [{t: 1}, {t: 2}]})).toBe(4)
  })
})
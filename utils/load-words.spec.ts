import { loadWordlist } from "./load-words"

describe('loadWords', () => {
  test('reads a list of words into an array', () => {
    expect(Array.isArray(loadWordlist())).toBeTruthy()
  })
})
import words from '../words.json'
import wordleDict from '../wordsDict.json'

export function loadWordlist(): string[] | undefined {
  try {
    return wordleDict.validWords.slice(0)
  } catch (err) {
    console.error(err)
  }
}
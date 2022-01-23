import words from '../words.json'

export function loadWordlist(): string[] | undefined {
  try {
    return words.slice(0)
  } catch (err) {
    console.error(err)
  }
}
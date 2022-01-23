import { Guess } from "./create-guess-from-word";
import { generateLetterScrores } from "./generate-letter-scores";
import { scoreWord } from "./score-word";

type wordTuple = [number, string]

export function sortWords(words: string[], gusses: Guess[] = []) {
  const letterScores = generateLetterScrores()
  
  return words
    .map((word, index) => {
      return [scoreWord(word, letterScores), word] as wordTuple
    })
    .sort(([scoreA], [scoreB]) => {
      return scoreB - scoreA
    })
    .map(([_, word])=> word)
}
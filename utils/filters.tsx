import * as R from 'ramda'

export const include = R.curry((letter: string, word: string): boolean => {
  return word.includes(letter)
})

export const notInclude = R.curry(R.pipe(include, R.not))

export const includeAtPosition = R.curry((letter: string, position: number, word: string): boolean => {
  return word.split('')[position] === letter
})

export const notIncludeAtPosition = R.curry(R.pipe(includeAtPosition, R.not))

export const maxCharCount = R.curry((letter: string, count: number, word: string): boolean => {
  return word.split('')
    .filter(char => char === letter)
    .length <= count 
})

export const minCharCount = R.curry((letter: string, count: number, word: string): boolean => {
  return word.split('')
    .filter(char => char === letter)
    .length >= count 
})
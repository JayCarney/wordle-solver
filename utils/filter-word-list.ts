export type Filter = (word: string) => boolean

export function filterWordList(wordList: string[], filters: Filter[]) {
  if (!filters || filters.length === 0) {
    return wordList
  }
  // @ts-ignore
  // const filter = R.pipe.apply(R, filters)
  return wordList.filter(word => {
    for (let filter of filters) {
      if (!filter(word)) {
        return false
      }
    }
    return true
  })
}
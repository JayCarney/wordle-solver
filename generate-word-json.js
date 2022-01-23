const fs = require('fs')

let data = []
const dictObj = {
  answers: [],
  validWords: []
}

try {
  data = fs.readFileSync('wordle.txt', 'utf8').split(/\r?\n/)
} catch(err) {
  console.error(err)
}

let isAnswer = true
const needle = 'List 2'
// get rid of first title
data.shift()
data.map((item) => {
  if (!item) {
    // skip empty rows
    return
  }
  if (isAnswer && item.startsWith(needle)) {
    isAnswer = false
    return
  }
  if (isAnswer) {
    dictObj.answers.push(item)
  }

  dictObj.validWords.push(item)
})

fs.writeFileSync('wordsDict.json', JSON.stringify(dictObj, null, 2))
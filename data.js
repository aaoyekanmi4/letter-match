const words = [
  'apple',
  'bear',
  'cat',
  'dog',
  'elephant',
  'fish',
  'grapes',
  'house',
  'ice',
  'jug',
  'kangaroo',
  'lion',
  'moose',
  'net',
  'owl',
  'pillow',
  'quilt',
  'raccoon',
  'sink',
  'telephone',
  'umbrella',
  'violin',
  'waterfall',
  'xylophone',
  'yak',
  'zebra'
]

const wordData = words.map((word) => {
  const wordFirst = word[0].toUpperCase()
  const restOfWord = word.slice(1)
  const upperCasedWord = wordFirst + restOfWord
  return {image: `./img/${word}.jpg`, text: upperCasedWord}
})

const letterData = [
  "Aa",
  "Bb",
  "Cc",
  "Dd",
  "Ee",
  "Ff",
  "Gg",
  "Hh",
  "Ii",
  "Jj",
  "Kk",
  "Ll",
  "Mm",
  "Nn",
  "Oo",
  "Pp",
  "Qq",
  "Rr",
  "Ss",
  "Tt",
  "Uu",
  "Vv",
  "Ww",
  "Xx",
  "Yy",
  "Zz"
]




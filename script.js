const main = document.querySelector('main')
const lettersSelect = document.getElementById('select-letters');
const resetSelect = document.getElementById('select-reset')
const modal = document.getElementById('modal')
const resetButton = document.getElementById('reset-button')

const message = new SpeechSynthesisUtterance();
const success = new Audio('/sounds/success-sound.mp3');
const gameWon = new Audio('/sounds/Tada-sound.mp3');

const allCards = []
const lastRevealedCards = [];

// Speech functions
function setTextMessage (text) {
  message.text = text;
}

function speakText () {
  speechSynthesis.speak(message)
}

const readMessage = (data) => {
  typeof data === 'string' ? setTextMessage(data[0]) : setTextMessage(data.text)
  setTimeout(speakText, 400)
}

// Match Functions
const lettersMatch = () => {
  const cardOneFirstLetter = lastRevealedCards[0].querySelector('p').innerText[0]
  const cardTwoFirstLetter = lastRevealedCards[1].querySelector('p').innerText[0]
  return  cardOneFirstLetter === cardTwoFirstLetter
}

const checkForMatch = () => {
  const cards = document.querySelectorAll('.card')
  cards.forEach((card) => card.classList.remove('clickable'))

  if (lettersMatch(lastRevealedCards)) {
    setTimeout(() => {
      success.play()
      lastRevealedCards.forEach((card) => card.classList.add('matched'))
    }, 1400)
  } else {
    setTimeout(() => {
      lastRevealedCards.forEach((card) => card.classList.remove('revealed'))
    }, 1400)
  }

  setTimeout(() => {
    lastRevealedCards.length = 0
    cards.forEach((card) => {
    if (!(card.classList.contains('matched'))) {
      card.classList.add('clickable')
     }
    })
  }, 1500)
}

const checkForGameOver = () => {
  const matchedCards = document.querySelectorAll('.matched')
  const cards = document.querySelectorAll('.card')
  if (matchedCards.length === cards.length) {
    modal.classList.add('show-modal')
    gameWon.play()
  }
}

// Create Card functions
const createInnerCardHTML = (data) => {
    if (typeof data === "object") {
        const { text, image } = data
        const firstLetter = text[0]
        const remaningLetters = text.slice(1)
        return `<div class="inner-card-back picture">
                  <img class="pic" src="${image}"/>
                  <p>
                    <span class="first">${firstLetter}</span>
                    <span class="rest">${remaningLetters}</span>
                  </p>
                </div>`
    } else {
        return `<div class="inner-card-back letter">
                  <p>
                    ${data}
                  </p>
                </div>`
    }
}

const createCard = (data) => {
  const card = document.createElement('div');
  card.classList.add('card', 'clickable')

  card.innerHTML = `
  <div class="inner-card">
    <div class="inner-card-front">
      <img class='card-background' src="img/card-background4.png" />
    </div>
    ${createInnerCardHTML(data)}
  </div>
`
  card.addEventListener('click', () => {
    if (card.classList.contains('clickable')) {
      card.classList.remove('clickable')
      card.classList.toggle('revealed')
      readMessage(data)
      lastRevealedCards.push(card)

      // Game Flow Checks
      if (lastRevealedCards.length === 2) checkForMatch()

      setTimeout(() => {
        checkForGameOver()
      }, 2000)
    }
  })
  allCards.push(card)
}

// Randomize Cards - Fischer Yates
const shuffle = (array) => {
  let j = 0
  let temp = null;

  for (let i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

// Select letter functions
const getIndicesRange = (start, end) => {
  const indexArray = []
  for (let i = start; i <= end; i++) {
    indexArray.push(i)
  }
  return indexArray
}

const getDataIndices = () => {
  let startIdx;
  let endIdx;
  const optionIdx = Number(lettersSelect.selectedIndex)

  if (optionIdx < 4) {
    startIdx = optionIdx * 6
    endIdx = (startIdx + 6) - 1
    return getIndicesRange(startIdx, endIdx)
  } else if (optionIdx === 4) {
    return getIndicesRange(20, 25)
  } else if (optionIdx === 5) {
    const chosenIndices = new Set()
    while (chosenIndices.size < 6) {
      chosenIndices.add(Math.floor(Math.random() * 25) + 1)
    }
    return [...chosenIndices]
  } else {
    return
  }
}

const getCardData = () => {
  const indices = getDataIndices();
  if (!indices) return [...letterData, ...wordData]
  const cardData = []
   indices.forEach((val) => {
    cardData.push(letterData[val])
    cardData.push(wordData[val])
   })
  return cardData
}

function displayCards () {
  const cardData = getCardData();
  cardData.forEach((val) => createCard(val))
  shuffle(allCards)
  allCards.forEach((card) => main.appendChild(card))
}

function resetGame () {
  main.innerHTML = ''
  allCards.length = 0
  lastRevealedCards.length = 0
  modal.classList.remove('show-modal')
  displayCards();
}

resetSelect.addEventListener('change', () => {
  lettersSelect.selectedIndex = resetSelect.selectedIndex
})

lettersSelect.addEventListener('change', () => {
  resetSelect.selectedIndex = lettersSelect.selectedIndex
  resetGame();
})

resetButton.addEventListener('click', () => {
  resetGame();
})

displayCards();


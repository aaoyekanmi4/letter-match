const main = document.querySelector('main')

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
                    <img class='card-background' src="/img/card-background1.svg" />
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

// Randomize Cards
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

// Show cards from letter select
const getDataIndices = () => {
  // const indexArray = []
  // for let i = startIdx; i <= endIdx; i++
  // indexArray.push(i)
  // get selected option value
  //use option value to calculate
  //if value < 4
  //startIdx = (value * 6)
  //endIdx = (startIdx + 6) -1
  //if value === 5 startIdx = 20 endIdx = 25
  //if value > 5
  // //for (let i = 0; i < 6; i++) {
  // const chosenIndices = new Set()
  // const nums = new Set();
// while(nums.size !== 6) {
//   nums.add(Math.floor(Math.random() * 25) + 1);
// }
  // }
  //return indexArray
}

const getCardData = () => {
 //map over indexArray
  // for both letterdata and wordata and get values at each index
  //return data
}

//this will be one for each for cardData, and next for lines will be in an init function
letterData.forEach((letter) => createCard(letter))
wordData.forEach((word) => createCard(word))

shuffle(allCards)
allCards.forEach((card) => main.appendChild(card))


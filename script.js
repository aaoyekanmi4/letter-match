const main = document.querySelector('main')

const message = new SpeechSynthesisUtterance();
const success = new Audio('/sounds/success-sound.mp3');
const gameWon = new Audio('/sounds/Tada-sound.mp3');

const letterCards = [];
const wordCards = [];
const lastRevealedCards = [];

//Fisher Yates shuffle
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

// set text for speech
function setTextMessage (text) {
  message.text = text;
}

//speak text
function speakText () {
  speechSynthesis.speak(message)
}

const lettersMatch = () => {
  const comparisonTexts= []
  lastRevealedCards.forEach((card) => {
    const text = card.querySelector('p').innerText
    comparisonTexts.push(text)
  })
  return  comparisonTexts[0][0] === comparisonTexts[1][0]
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
  console.log(cards)
  if (matchedCards.length === cards.length) {
    gameWon.play()
  }
}

const createLetterCard = (letter) => {
  const card = document.createElement('div');
  card.classList.add('card', 'clickable')

  card.innerHTML = `
            <div class="inner-card">
                <div class="inner-card-front">
                    <img src="/img/card-background.svg" height="100%" />
                </div>
                <div class="inner-card-back letter">
                    <p>
                        ${letter}
                    </p>
                </div>
            </div>
`
  card.addEventListener('click', () => {
    if (card.classList.contains('clickable')) {
      card.classList.remove('clickable')
      card.classList.toggle('revealed')
      setTextMessage(letter[0])
       setTimeout(speakText, 400)
      lastRevealedCards.push(card)
      if (lastRevealedCards.length === 2) checkForMatch()
         setTimeout(() => {
        checkForGameOver()
      }, 2000)
    }
  })

  letterCards.push(card)
}

const createWordCard = (data) => {
  const card = document.createElement('div');
  card.classList.add('card', 'clickable')

  const { text, image } = data
  const firstLetter = text[0]
  const remaningLetters = text.slice(1)
  card.innerHTML = `
  <div class="inner-card">
                <div class="inner-card-front">
                    <img src="/img/card-background.svg" height="100%" />
                </div>
                <div class="inner-card-back picture">
                    <img class="pic" src="${image}"/>
                    <p>
                        <span class="first">${firstLetter}</span>
                        <span class="rest">${remaningLetters}</span>
                    </p>
                </div>
            </div>
`

  card.addEventListener('click', () => {
    if (card.classList.contains('clickable')) {
      card.classList.remove('clickable')
      card.classList.toggle('revealed')
      setTextMessage(text)
      setTimeout(speakText, 400)
      lastRevealedCards.push(card)

      if (lastRevealedCards.length === 2) checkForMatch()
      setTimeout(() => {
        checkForGameOver()
      }, 2000)
    }
  })

  wordCards.push(card)
}

letterData.forEach((letter) => createLetterCard(letter))
wordData.forEach((word) => createWordCard(word))

const allCards = [...letterCards, ...wordCards]
shuffle(allCards)
allCards.forEach((card) => main.appendChild(card))


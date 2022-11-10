const main = document.querySelector('main')

const message = new SpeechSynthesisUtterance();

const letterCards = [];
const wordCards = [];
const revealedCards = [];
let wordCardRevealed = false;
let letterCardRevealed = false;

//Fisher Yates shuffle
const shuffle = (array) => {
  var i = 0,
    j = 0,
    temp = null;

  for (i = array.length - 1; i > 0; i -= 1) {
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

const lettersMatch = (cardsList) => {
  return cardsList[0][0] === cardsList[1][0]
}

//check for match
const checkForMatch = () => {
const cards = document.querySelectorAll('.card')
  cards.forEach((card) => card.classList.remove('clickable'))
  const revealedCardsList = document.querySelectorAll('.revealed')

  if ((wordCardRevealed && letterCardRevealed) && lettersMatch(revealedCardsList)) {

  //revealedCards add class to show match
    revealedCardsList.forEach((card) => card.classList.add('matched'))
  //play success sound
  //remove cards from dom
  //put clickable back on all cards
  //toggle revealed on revealed list
  }

//else play sound for being wrong
  //toggle revealed on revealed list
//flip cards back over
//put clickable back on all cards
}

const createLetterCard = (letter) => {
  const card = document.createElement('div');
  card.classList.add('card', 'clickable')

  card.innerHTML = `<div class='card'>
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
    </div>
`
  card.addEventListener('click', () => {
    if (card.classList.contains('clickable')) {
      card.classList.remove('clickable')
      card.classList.toggle('revealed')
      letterCardRevealed = true;
      setTextMessage(letter[0])
       setTimeout(speakText, 400)
      revealedCards.push(card)
      if (revealedCards.length === 2) checkForMatch()

    }
  })

  letterCards.push(card)
}

const createWordCard = (data) => {
  const card = document.createElement('div');
  card.classList.add('card', 'clickable')

  const { text, image } = data
  card.innerHTML = `
  <div class="inner-card">
                <div class="inner-card-front">
                    <img src="/img/card-background.svg" height="100%" />
                </div>
                <div class="inner-card-back picture">
                    <img class="pic" src="${image}"/>
                    <p>
                        ${text}
                    </p>
                </div>
            </div>
`

  card.addEventListener('click', () => {
    if (card.classList.contains('clickable')) {
      card.classList.remove('clickable')
      card.classList.toggle('revealed')
      wordCardRevealed = true;
      setTextMessage(text)
      setTimeout(speakText, 400)
      revealedCards.push(card)
      //change to use NodeListwww
      if (revealedCards.length === 2) checkForMatch()
    }
  })

  wordCards.push(card)
}


letterData.forEach((letter) => createLetterCard(letter))
wordData.forEach((word) => createWordCard(word))

const allCards = [...letterCards, ...wordCards]
// shuffle(allCards)
allCards.forEach((card) => main.appendChild(card))


const main = document.querySelector('main')
const message = new SpeechSynthesisUtterance();
const letterCards = [];
const wordCards = [];

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
      // card.classList.remove('clickable')
      card.classList.toggle('revealed')
      setTextMessage(letter[0])
      setTimeout(speakText, 400)
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
      // card.classList.remove('clickable')
      card.classList.toggle('revealed')
        setTextMessage(text)
      setTimeout(speakText, 400)
    }
  })

  wordCards.push(card)
}

letterData.forEach((letter) => createLetterCard(letter))
wordData.forEach((word) => createWordCard(word))

const allCards = [...letterCards, ...wordCards]
shuffle(allCards)
allCards.forEach((card) => main.appendChild(card))


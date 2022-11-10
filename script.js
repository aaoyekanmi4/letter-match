const main = document.querySelector('main')

const letterCards = [];
const wordCards = [];

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
    }
  })

  wordCards.push(card)
}

letterData.forEach((letter) => createLetterCard(letter))
letterCards.forEach((card) => main.appendChild(card))

wordData.forEach((word) => createWordCard(word))
wordCards.forEach((card) => main.appendChild(card))

const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
    'percy',
    'annabeth',
    'jason',
    'piper',
    'leo',
    'frank',
    'hazel',
    'nico',
    'reyna',
    'octavian'
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
  }

let firstCard = '';
let secondCard = '';

// CHECANDO SE O JOGO TERMINOU

checkEndGame = () => {
    const disabledCard = document.querySelectorAll('.disabled-card');
    if(disabledCard.length === 20){
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de ${timer.innerHTML} segundos.`);
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    // Caso acerte deixa o card virado com a parte da frente
    if (firstCharacter === secondCharacter){
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();
    // Caso erre vira as cartas de volta
    }else{
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 500);

    }
}

const revealCard = ({ target }) => {

    if(target.parentNode.className.includes('reveal-card')){
        return;
    }

    if (firstCard === ''){
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }

}


// CRIANDO OS CARDS
const createCard = (character) => {
    const card = createElement('div', 'card'); // div.card -> criando uma div e colocando com o nome de "card"
    const front = createElement('div', 'face front'); // div.front -> criando uma div e colocando com o nome de "face front"
    const back = createElement('div', 'face back'); // back -> criando uma div e colocando com o nome de "face ack"


    front.style.backgroundImage = `url('../imagens/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard); // Deixando a carta clicável
    card.setAttribute('data-character', character)

    return card;
}

const loadGame = () => {

    const duplicateCharacters = [ ...characters, ...characters ] // Duplicando o array charachters e colocando em um novo array

    const shuffleArray = duplicateCharacters.sort( () => Math.random() - 0.5 ); // Deixando as cartas em ordem aleátoria

    shuffleArray.forEach((character) => {
        
        const card = createCard(character);
        grid.appendChild(card);

    });

}

const startTimer = () => {
    this.loop = setInterval(() => {

        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;

    }, 1000);

}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
}


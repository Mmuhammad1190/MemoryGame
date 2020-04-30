const gameContainer = document.getElementById("game");
const newGame = document.querySelector('#newGame');
const shuffle1 = document.querySelector('#shuffle');
let flippedCard = false;
let firstChoice, secondChoice;
let locked = false;




const colors = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
];

function shuffle(array) {
    let counter = array.length;

    while(counter > 0) {
        let index = Math.floor(Math.random() * counter)
        counter--;

        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

let shuffledColors = shuffle(colors);

function createdDivsForColors(colorArray) {
    for (let color of colorArray) {
        const newDiv = document.createElement('div');

        newDiv.classList.add(color);
        newDiv.setAttribute('data-color', color);

        newDiv.addEventListener('click', handleCardClick);
        gameContainer.append(newDiv);
    }
}

function handleCardClick(e) {
    colors.forEach(card => game.addEventListener('click', flipCard));
}

createdDivsForColors(shuffledColors);

function flipCard(e) {
    if (locked) return;
    if (e.target === firstChoice) return;
    e.target.style.background = e.target.className;

    if (!flippedCard) {
        //first click
        flippedCard = true;
        firstChoice = e.target;
        return;
    }
    //second click 
    secondChoice = e.target;

    //check for a match 
    checkMatches();
}



const checkMatches = () => {
    let match = firstChoice.className === secondChoice.className;
    match ? gameOver() : unFlip();
}

const gameOver = () => {
    firstChoice.removeEventListener('click', flipCard)
    secondChoice.removeEventListener('click', flipCard)
    reset();
}

const unFlip = () => {
    locked = true;
    setTimeout(() => {
        firstChoice.style.background = 'black';
        secondChoice.style.background = 'black';
        reset();
    }, 1000)
}

const reset = () => {
    [flippedCard, locked] = [false, false];
    [firstChoice, secondChoice] = [null, null];
}

newGame.addEventListener('click',() => {
    while (gameContainer.hasChildNodes()) {
        gameContainer.removeChild(gameContainer.firstChild)
    }
    setTimeout(() => {
        shuffle(colors);
        createdDivsForColors(shuffledColors);
    }, 500);
});

shuffle1.addEventListener('click', ()=> {
    while (gameContainer.hasChildNodes()) {
        gameContainer.removeChild(gameContainer.firstChild)
    }
    shuffle(colors);
    createdDivsForColors(shuffledColors);
})
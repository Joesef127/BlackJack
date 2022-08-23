// assigning and declaring variables
let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let pointIncrease = 0;
let pointDecrease = 0;
let pointZero = 0;

// fetching from html
let messageEl = document.getElementById("message-el");
let sumEl = document.querySelector("#sum-el");
let cardsEl = document.querySelector("#cards-el");
let playerEl = document.getElementById("player-el");
let modal = document.getElementById("modalBox");
let helpBox = document.getElementById("helpBox");

// user bonus
let player = {
  name: "Cash",
  credits: 100,
};

playerEl.textContent = player.name + ": $" + player.credits;

// generate random number within a range
function getRandomCard() {
  let randomCard = Math.floor(Math.random() * 10) + 1;
  if (randomCard === 1) {
    return 11;
  } else if (randomCard > 10) {
    return 10;
  } else {
    return randomCard;
  }
}

// start-game button
function startGame() {
  isAlive = true;
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;
  renderGame();
  // zero()
}

function renderGame() {
  cardsEl.textContent = "Cards: ";
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " ";
  }
  sumEl.textContent = "Sum: " + sum;
  if (sum < 21) {
    message = "Draw a new card?";
    hasBlackJack = false;
    bonus();
  } else if (sum === 21) {
    message = "You've got blackjack!";
    hasBlackJack = true;
    bonus();
    startGame()
  } else if (sum > 21) {
    message = "You lost, try again!";
    isAlive = false;
    // hasBlackJack = false;
    bonus();
  }
  messageEl.textContent = message;
}

// add new card
function newCard() {
  if (isAlive === true && hasBlackJack === false) {
    let card = getRandomCard();
    sum += card;
    cards.push(card);
    renderGame();
    bonus();
  }
}

function bonus() {
  if (isAlive === true && hasBlackJack === true) {
    pointIncrease = player.credits += 20;
    playerEl.textContent = player.name + ": $" + pointIncrease;
    console.log(pointIncrease);
  } else if (isAlive === true && hasBlackJack === false) {
    pointDecrease = player.credits -= 5;
    playerEl.textContent = player.name + ": $" + pointDecrease;
    console.log(pointDecrease);
    zero();
  }
}

function zero() {
  if (pointDecrease <= 0 && hasBlackJack === false) {
    pointZero = (player.credits = 0);
    playerEl.textContent = player.name + ": $" + pointZero;
    isAlive = false;
    message = "You're out of money!";
    messageEl.textContent = message;
    sum = 0;
    cards = [];
  }
}

// display the modal
function displayModal() {
  modal.style.display = "block";
}

function displayHelp() {
  helpBox.style.display = "block"
}

window.onclick = function (event) {
  if (event.target == modal || event.target == helpBox) {
    modal.style.display = "none";
    helpBox.style.display = "none"
  }
};

// close the modal
function closeModal() {
  modal.style.display = "none";
  helpBox.style.display = "none"
}

// Display help box

// assigning and declaring variables
let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";

// fetching from html
let messageEl = document.getElementById("message-el");
let sumEl = document.querySelector("#sum-el");
let cardsEl = document.querySelector("#cards-el");
let playerEl = document.getElementById("player-el");
let modal = document.getElementById("modalBox");

// user bonus
let player = {
  name: "Cash",
  chips: 0,
};

playerEl.textContent = player.name + ": $" + player.chips;

// generate random number within a range
function getRandomCard() {
  let randomCard = Math.floor(Math.random() * 13) + 1;
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
}

function renderGame() {
  cardsEl.textContent = "Cards: ";
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " ";
  }
  sumEl.textContent = "Sum: " + sum;
  if (sum < 21) {
    message = "Draw a new card?";
  } else if (sum === 21) {
    message = "You've got blackjack!";
    hasBlackJack = true;
  } else if (sum > 21) {
    message = "You lost, try again!";
    isAlive = false;
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
  }
}

// display the modal
function displayModal() {
  modal.style.display = "block"
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none"
  }
}

// close the modal
function closeModal() {
  modal.style.display = "none"
  player.chips = 0
}

/*issues to fix
-Card can be flipped and causes you to lose life points if dbl flipped
-card can be reflipped
-cards can be clicked on several times to cause bug that doesnt flip and drains lifepoints
-if there is not a match, you can still lose lifepoints
*/

const playerLifePoint = document.querySelector('.playerLife span');
const botLifePoint = document.querySelector('.botLife span');

//Results of game
const playerResult = document.querySelector('.playerScore h3');
const botResult = document.querySelector('.botScore h3');

//Speech bubbles
const kaibaSpeech = document.querySelector('.kaiba h4');
const yugiSpeech = document.querySelector('.yugimoto h4');
const activeBubble = document.querySelector('.character section');

// Music Event listeners
document.addEventListener('click', musicPlay);
document.querySelector('.music i').addEventListener('click', stopMusic);

// Controls audio volume
document.querySelector('#yugiohAudio').volume = 0.05;

//Reset
document.querySelector('.reset a').addEventListener('click', reset);

//Each card for player and bot
const playerCard = document.querySelectorAll('.playerCard');
const botCard = document.querySelectorAll('.botCard');

// Score variables and life points
let playerScore = 4000;
let botScore = 4000;

//Variables set false to use inside the functions to set cards
let cardFlipped = false;
let botCardFlipped = false;

let stopCardFlipFeature = false;
let cardOne, cardTwo, botCardOne, botCardTwo;

//Player flip card event listener
playerCard.forEach((card) => card.addEventListener('click', flipCard));

// Flip animation toggle & card choice
function flipCard() {
  let i = 0;
  //variable randomize to give random number between 1 and 10
  let randomize = Math.floor(Math.random() * 10);
  //
  while (i < 10 && botCard[randomize].classList.contains('match')) {
    randomize = Math.floor(Math.random() * 10);
    i++;
  }

  if (stopCardFlipFeature) return;

  this.classList.toggle('flip');

  //bot flip function
  botFlipCard(randomize);

  if (!cardFlipped) {
    cardFlipped = true;
    cardOne = this;
    return;
  }

  cardFlipped = false;
  cardTwo = this;
  checkPlayerMatch();
}

// Check for player Win
function checkPlayerMatch() {
  //do playerCard match?
  if (cardOne.dataset.name === cardTwo.dataset.name) {
    //its a match
    cardOne.removeEventListener('click', flipCard);
    cardTwo.removeEventListener('click', flipCard);
    let newBotScore = (botLifePoint.innerText = botScore - 800);
    botScore = newBotScore;
    checkWinner(playerScore, botScore);
    characterBanter(playerScore, botScore);
  } else {
    //not a match
    stopCardFlipFeature = true;
    setTimeout(() => {
      cardOne.classList.remove('flip');
      cardTwo.classList.remove('flip');
      stopCardFlipFeature = false;
    }, 1700);
  }
}
// Check for bot Win
function checkBotMatch() {
  //its a match
  if (botCardOne.dataset.bot === botCardTwo.dataset.bot) {
    let newPlayerScore = (playerLifePoint.innerText = playerScore - 800);
    playerScore = newPlayerScore;
    checkWinner(playerScore, botScore);
    characterBanter(playerScore, botScore);
    botCardOne.classList.toggle('match');
    botCardTwo.classList.toggle('match');
    // console.log(botCard)
  } else {
    setTimeout(() => {
      botCardOne.classList.remove('flip');
      botCardTwo.classList.remove('flip');
    }, 1700);
  }
}

// PLAYER SHUFFLE. It is wrapped in a self invoking function to shuffle immediately on reload.
(function shuffle() {
  playerCard.forEach((card) => {
    //for each card order will randomize using random.
    let random = Math.floor(Math.random() * 10);
    card.style.order = random;
  });
})();

//BOT FUNCTIONS
//BOT SHUFFLE
//same as above
function shuffleBot() {
  botCard.forEach((card) => {
    let random = Math.floor(Math.random() * botCard.length);
    card.style.order = random;
  });
}

//BOT CARD FLIP
function botFlipCard(randomize) {
  botCard[randomize].classList.toggle('flip');
  if (!botCardFlipped) {
    botCardFlipped = true;
    botCardOne = botCard[randomize];
    return;
  }

  botCardFlipped = false;
  botCardTwo = botCard[randomize];
  console.log(botCardOne, botCardTwo);
  checkBotMatch();
}

function checkWinner(playerScore, botScore) {
  console.log(playerScore, botScore);
  if (playerScore === 0 && botScore > 0) {
    botResult.innerText = 'Kaiba Won!';
  } else if (playerScore > 0 && botScore === 0) {
    playerResult.innerText = 'You Won!';
  } else if (playerScore === 0 && botScore === 0) {
    playerResult.innerText = 'Draw!';
    botResult.innerText = 'Draw!';
  }
}

function characterBanter(playerScore, botScore) {
  botScore == 2400
    ? (kaibaSpeech.innerText = "You won't win Pharaoh!")
    : botScore === 1600
    ? (kaibaSpeech.innerText = 'Impossible!')
    : botScore === 0
    ? (kaibaSpeech.innerText = 'Argh!')
    : '';

  playerScore == 2400
    ? (yugiSpeech.innerText = 'Give it up Kaiba!')
    : playerScore === 1600
    ? (yugiSpeech.innerText = 'Heart of the Cards, guide me!')
    : playerScore === 0
    ? (yugiSpeech.innerText = "..I've Lost..")
    : '';

  if (playerScore === 0 && botScore === 0) {
    kaibaSpeech.innerText = "This isn't over Pharaoh!";
    yugiSpeech.innerText = "I'll Duel you anytime Kaiba.";
  }

  // else if(playerScore > 0 && botScore === 0){
  //   yugiSpeech.innerText = 'I win again, Kaiba.'
  // }

  // else if(playerScore === 0 && botScore > 0){
  //   kaibaSpeech.innerText = 'You\'re only second best. To me.'
  // }
}

function musicPlay() {
  document.getElementById('yugiohAudio').play();
}

function stopMusic() {
  document.getElementById('yugiohAudio').pause();
  document.getElementById('yugiohAudio').src =
    document.getElementById('yugiohAudio').src;
}

function reset() {
  location.reload();
}

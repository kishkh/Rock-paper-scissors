/* eslint-disable default-case */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
// Selectors
const playerScoreSelector = document.querySelector('#player-score');
const enemyScoreSelector = document.querySelector('#enemy-score');
const resultMessageSelector = document.querySelector('#result-message');
const choisesSelector = document.querySelectorAll('.choice');
const choiceContainerSelector = document.querySelector('.choices');
const history = document.querySelector('.history');
const choiceImgEnemy = document.querySelector('#img-enemy');

// Variable
let playerScore = 0;
let enemyScore = 0;

function addHistory(text, playerSc, enemySc, result) {
  const newSpan = document.createElement('span');
  newSpan.classList.add(result);
  newSpan.innerHTML = `Player ${playerSc}:${enemySc} Enemy. ${text}`;
  history.appendChild(newSpan);
}

function win(player) {
  switch (player) {
    case 'r':
      resultMessageSelector.innerHTML = 'Player win! Rock breaks scissors!';
      resultMessageSelector.className = 'win';
      playerScore++;
      addHistory('Player win! Rock breaks scissors!', playerScore, enemyScore, 'win');
      break;
    case 'p':
      resultMessageSelector.innerHTML = 'Player win! Paper covers rock!';
      resultMessageSelector.className = 'win';
      playerScore++;
      addHistory('Player win! Paper covers rock!', playerScore, enemyScore, 'win');
      break;
    case 's':
      resultMessageSelector.innerHTML = 'Player win! Scissors cut paper!';
      resultMessageSelector.className = 'win';
      playerScore++;
      addHistory('Player win! Scissors cut paper!', playerScore, enemyScore, 'win');
      break;
  }
}
function lose(player) {
  switch (player) {
    case 'r':
      resultMessageSelector.innerHTML = 'Enemy win! Paper covers rock!';
      resultMessageSelector.className = 'lose';
      enemyScore++;
      addHistory('Enemy win! Paper covers rock!', playerScore, enemyScore, 'lose');
      break;
    case 'p':
      resultMessageSelector.innerHTML = 'Enemy win! Scissors cut paper!';
      resultMessageSelector.className = 'lose';
      enemyScore++;
      addHistory('Enemy win! Scissors cut paper!', playerScore, enemyScore, 'lose');
      break;
    case 's':
      resultMessageSelector.innerHTML = 'Enemy win! Rock breaks scissors!';
      resultMessageSelector.className = 'lose';
      enemyScore++;
      addHistory('Enemy win! Rock breaks scissors!', playerScore, enemyScore, 'lose');
      break;
  }
}
function draw() {
  resultMessageSelector.innerHTML = 'draw';
  resultMessageSelector.className = 'draw';
  addHistory('Draw.', playerScore, enemyScore, 'draw');
}
function game(e, player, enemy) {
  switch (player + enemy) {
    case 'rr':
    case 'pp':
    case 'ss':
      draw(player);
      break;
    case 'rs':
    case 'pr':
    case 'sp':
      win(player);
      break;
    case 'rp':
    case 'ps':
    case 'sr':
      lose(player);
      break;
  }
  playerScoreSelector.innerHTML = playerScore;
  enemyScoreSelector.innerHTML = enemyScore;
}
function randomChoice(min, max, arr) {
  const index = (Math.floor(Math.random() * (max - min + 1)) + min) - 1;
  return arr[index];
}
function showImgEnemy(id) {
  choiceImgEnemy.classList.add('hide');
  setTimeout(() => {
    choiceImgEnemy.classList.remove('hide', 'fade');
    choiceImgEnemy.classList.add('fade');
  }, 100);
  if (id === 'r') {
    choiceImgEnemy.src = '../images/rock.png';
  } else if (id === 'p') {
    choiceImgEnemy.src = '../images/paper.png';
  } else if (id === 's') {
    choiceImgEnemy.src = '../images/scissors.png';
  }
}

choisesSelector.forEach((choice) => {
  choice.addEventListener('click', (e) => {
    choiceContainerSelector.classList.add('noEvent');
    setTimeout(() => {
      const playerChoice = e.target.getAttribute('id');
      const enemyChoice = randomChoice(1, 3, ['r', 'p', 's']);
      game(e, playerChoice, enemyChoice);
      showImgEnemy(enemyChoice);
      playerScoreSelector.innerHTML = playerScore;
      enemyScoreSelector.innerHTML = enemyScore;
      choiceContainerSelector.classList.remove('noEvent');
    }, 200);
  });
});

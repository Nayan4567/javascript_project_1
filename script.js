'use strict';

let scores, roundScore, activePlayer, dice, playing;

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--save');

// Switch player function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  roundScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Initialize game
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner', 'player--active');
  player1El.classList.remove('player--winner', 'player--active');
  player0El.classList.add('player--active');

  document.getElementById('winner-announcement').classList.add('hidden');

  document.getElementById('name--0').textContent = sessionStorage.getItem('player1');
  document.getElementById('name--1').textContent = sessionStorage.getItem('player2');
}
init();

// Roll dice event
btnRoll.addEventListener('click', function () {
  if (playing) {
    dice = Math.floor(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `assets/dice-${dice}.png`;

    if (dice !== 1) {
      roundScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = roundScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold score event
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += roundScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');

      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

      document.getElementById('winner-announcement').textContent = `🎉 Player ${activePlayer + 1} Wins! 🎉`;
      document.getElementById('winner-announcement').classList.remove('hidden');
    } else {
      switchPlayer();
    }
  }
});

// Reset game event (but keep the same active player)
btnNew.addEventListener('click', function () {
  scores = [0, 0];
  roundScore = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  document.getElementById('winner-announcement').classList.add('hidden');
});

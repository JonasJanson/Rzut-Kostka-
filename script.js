'use strict';

// Wybieranie elementów
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScoreEl0 = document.getElementById('current--0');
const currentScoreEl1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Wartości początkowe
const resetGame = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScoreEl0.textContent = 0;
  currentScoreEl1.textContent = 0;

  diceEl.classList.add('.hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
};
resetGame();

// Zmiana zawodnika
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Aktywacje przycisku 'Roll'
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Wygenerować losowy numer rzutu kostki
    let dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // 2. Wyświetlić obrazek rzutu kostki
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. Zadziałać w momencie wylosowania '1'; jeśli tak to przełączyć gracza
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // Dodaj liczbę do aktualnego wyniku
    } else {
      // Zmiana zawodnika
      switchPlayer();
    }
  }
});

// Aktywacja przycisku 'Hold'
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Dodaj podwynik do wyniku globalnego aktywnego gracza
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Sprawdź czy wynik jest => 100?
    if (scores[activePlayer] >= 100) {
      // Zakończ grę
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Zmień zawodnika
      switchPlayer();
    }
  }
});

// Przycisk uruchomienie gry
btnNew.addEventListener('click', resetGame);

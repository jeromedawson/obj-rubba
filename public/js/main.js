// Select elements
const chatBox = document.querySelector('#chat-box');
const objectionInput = document.querySelector('#objection-input');
const findRebuttalButton = document.querySelector('#find-rebuttal');
const scriptTextarea = document.querySelector('#script-textarea');
const favoritesButton = document.querySelector('#favorites');
const mostUsedButton = document.querySelector('#most-used');
const donateButton = document.querySelector('#donate');

// Add event listeners
findRebuttalButton.addEventListener('click', findRebuttal);
favoritesButton.addEventListener('click', goToFavorites);
mostUsedButton.addEventListener('click', goToMostUsed);
donateButton.addEventListener('click', goToDonate);

function findRebuttal() {
  const objection = objectionInput.value;
  // TODO: Send objection to server and get rebuttal
  // TODO: Display rebuttal in chat box
}

function goToFavorites() {
  // TODO: Navigate to Favorites page
}

function goToMostUsed() {
  // TODO: Navigate to Most Used page
}

function goToDonate() {
  // TODO: Navigate to Donate page
}

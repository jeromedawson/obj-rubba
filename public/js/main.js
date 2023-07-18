// Select elements
const chatBox = document.querySelector('#chat-box');
const objectionInput = document.querySelector('#objection-input');
const findRebuttalButton = document.querySelector('#find-rebuttal');
const scriptTextarea = document.querySelector('#script-textarea');
const favoritesButton = document.querySelector('#favorites');
const mostUsedButton = document.querySelector('#most-used');
const donateButton = document.querySelector('#donate');
const loadingSpinner = document.querySelector('#loading-spinner');
const errorMessage = document.querySelector('#error-message');


// Add event listeners
findRebuttalButton.addEventListener('click', findRebuttal);
favoritesButton.addEventListener('click', goToFavorites);
mostUsedButton.addEventListener('click', goToMostUsed);
donateButton.addEventListener('click', goToDonate);

async function findRebuttal() {
  const objection = objectionInput.value;

  if (!objection.trim()) {
    errorMessage.textContent = 'Please enter an objection.';
    errorMessage.classList.remove('hidden');
    return;
  }

  loadingSpinner.classList.remove('hidden');

  try {
    /* ... */
  } catch (error) {
    errorMessage.textContent = 'An error occurred. Please try again.';
    errorMessage.classList.remove('hidden');
  } finally {
    loadingSpinner.classList.add('hidden');
  }
}

async function saveScript() {
  const content = scriptTextarea.value;

  if (!content.trim()) {
    errorMessage.textContent = 'Please enter a script.';
    errorMessage.classList.remove('hidden');
    return;
  }

  try {
    /* ... */
  } catch (error) {
    errorMessage.textContent = 'An error occurred while saving your script. Please try again.';
    errorMessage.classList.remove('hidden');
  }
}

  
  // Make a POST request to the rebuttal endpoint
  const response = await fetch('/rebuttals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ objection }),
  });

  const data = await response.json();
  const rebuttal = data.rebuttal;

  // Display the rebuttal in the chat box
  const message = document.createElement('p');
  message.textContent = rebuttal;
  chatBox.appendChild(message);
}

function goToFavorites() {
  // Navigate to Favorites page
  window.location.href = '/favorites';
}

function goToMostUsed() {
  // Navigate to Most Used page
  window.location.href = '/usages';
}

function goToDonate() {
  // Navigate to Donate page
  window.location.href = 'https://www.paypal.com/donate';
}

// Save script when user leaves the page
window.addEventListener('beforeunload', saveScript);

async function saveScript() {
  const content = scriptTextarea.value;

  // Make a POST request to the scripts endpoint
  await fetch('/scripts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });
}

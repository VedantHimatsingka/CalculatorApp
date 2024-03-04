const keys = document.querySelectorAll('.key');
const input = document.querySelector('.input');

// Function to handle key press
function handleKeyPress(event) {
  const keyValue = event.key;
  const keyCode = event.keyCode;
  const allowedKeys = /[0-9/\*\-\+%=\.\b]/; // Allowed keys: 0-9, operators, equals, decimal point, and backspace (\b)
  
  if (allowedKeys.test(keyValue) || keyCode === 13 || keyValue === 'Backspace') {
    if (allowedKeys.test(keyValue)) {
      if (input.value.length >= 15) {
        event.preventDefault(); // Prevent further input if the limit is reached
        return;
      }
    }
    if (keyValue === '=') {
      calculateResult();
    } else if (keyCode === 13) { // For Enter key
      event.preventDefault(); // Prevent form submission
      calculateResult();
    } else if (keyValue === 'Backspace') { // For backspace
      event.preventDefault(); // Prevent default behavior (like going back in browser)
      input.value = input.value.slice(0, -1);
    } else if (keyValue === 'c' || keyValue === 'C') { // For "C" key to clear
      input.value = '';
    } else {
      input.value += keyValue;
    }
  }
}

// Event listener for keydown event on input field
input.addEventListener('keydown', handleKeyPress);

// Function to calculate result
function calculateResult() {
  try {
    const result = eval(input.value);
    if (result.toString().length > 10) {
      input.value = 'Exceeded the limit';
    } else {
      input.value = result;
    }
  } catch (error) {
    input.value = 'Error';
  }
}

// Event listener for keydown event
document.addEventListener('keydown', handleKeyPress);

// Inside the event listener for click event on buttons
keys.forEach(key => {
  key.addEventListener('click', () => {
    const keyValue = key.dataset.key;
    if (keyValue === '=') {
      calculateResult();
    } else if (keyValue === 'clear') {
      input.value = '';
    } else if (keyValue === 'back') { // Handling back button
      input.value = input.value.slice(0, -1);
    } else if (keyValue === 'square') { // Handling square operator
      const currentValue = parseFloat(input.value);
      const squareValue = currentValue * currentValue;
      input.value = squareValue;
    } else {
      input.value += keyValue;
    }
  });
});
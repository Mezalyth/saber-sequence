const side = ['Light', 'Dark']
const strike = [
  '1 - Right Shoulder',
  '2 - Left Shoulder',
  '3 - Right Leg',
  '4 - Right Leg',
  '5 - Right Body',
  '6 - Left Body',
  '7 - Overhead',
  '8 - Uppercut',
  '9 - Body Slash / Thrust',
  '10 - Force Push'
]

// ------ Generate a New Sequence ------
function makeFight() {
  const listItems = document.querySelectorAll('#sequence li');

  listItems.forEach(item => {
    item.classList.remove('light-side', 'dark-side');
    item.textContent = '';
  });

  listItems.forEach(item => {
    const sideIndex = Math.floor(Math.random() * side.length);
    const selectedSide = side[sideIndex];

    const strikeIndex = Math.random() < 0.8 ? Math.floor(Math.random() * 8) : Math.floor(Math.random() * 2) + 8;
    const selectedStrike = strike[strikeIndex];

    if (selectedSide === 'Light') {
      item.classList.add('light-side');
    } else {
      item.classList.add('dark-side');
    }

    item.innerHTML = `${selectedSide} ${selectedStrike} <button onclick="switchSides(this)">Switch Sides</button>`;
  });
}

// ------ Switch Sides ------
function switchSides(button) {
  // Get the parent <li> element
  const listItem = button.parentElement;

  // Get the current text content (excluding the button text)
  let text = listItem.textContent.replace("Switch Sides", "").trim();

  // Swap the class and text based on the current side
  if (listItem.classList.contains('light-side')) {
    listItem.classList.remove('light-side');
    listItem.classList.add('dark-side');
    text = text.replace('Light', 'Dark'); // Swap the text from Light to Dark
  } else if (listItem.classList.contains('dark-side')) {
    listItem.classList.remove('dark-side');
    listItem.classList.add('light-side');
    text = text.replace('Dark', 'Light'); // Swap the text from Dark to Light
  }

  // Update the list item's content with the swapped side text and the button
  listItem.innerHTML = `${text} <button onclick="switchSides(this)">Switch Sides</button>`;
}

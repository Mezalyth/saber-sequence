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

    item.innerHTML = `
  ${selectedSide} ${selectedStrike}
  <div class="button-container">
    <button onclick="switchSides(this)">Switch Sides</button>
    <button onclick="changeStrike(this)">Change Strike</button>
  </div>`;

  });
}

// ------ Switch Sides ------
function switchSides(button) {
  const listItem = button.parentElement.parentElement;

  let text = listItem.textContent.replace("Switch Sides", "").replace("Change Strike", "").trim();

  if (listItem.classList.contains('light-side')) {
    listItem.classList.remove('light-side');
    listItem.classList.add('dark-side');
    text = text.replace('Light', 'Dark'); 
  } else if (listItem.classList.contains('dark-side')) {
    listItem.classList.remove('dark-side');
    listItem.classList.add('light-side');
    text = text.replace('Dark', 'Light');
  }

  listItem.innerHTML = `
    ${text}
    <div class="button-container">
      <button onclick="switchSides(this)">Switch Sides</button>
      <button onclick="changeStrike(this)">Change Strike</button>
    </div>`;
}

// ------ Change Strike ------
function changeStrike(button) {
  const listItem = button.parentElement.parentElement;

  let text = listItem.textContent.replace("Switch Sides", "").replace("Change Strike", "").trim();

  listItem.innerHTML = `
    ${text}
    <div class="button-container">
      <button onclick="switchSides(this)">Switch Sides</button>
      <button onclick="changeStrike(this)">Change Strike</button>
    </div>`;

}
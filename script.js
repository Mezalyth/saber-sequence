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

function makeFight() {
  const listItems = document.querySelectorAll('#sequence li');

  listItems.forEach(item => {
    item.classList.remove('light-side', 'dark-side');
    item.textContent = '';
  });

  listItems.forEach(item => {
    const sideIndex = Math.floor(Math.random() * side.length);
    const selectedSide = side[sideIndex];

    const strikeIndex = Math.floor(Math.random() * strike.length);
    const selectedStrike = strike[strikeIndex];

    if (selectedSide === 'Light') {
      item.classList.add('light-side');
    } else {
      item.classList.add('dark-side');
    }

    item.textContent = `${selectedSide} ${selectedStrike}`;
  });
}
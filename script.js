const side = ['Light', 'Dark'];
const strike = [
  '1 - Right Shoulder',
  '2 - Left Shoulder',
  '3 - Right Leg',
  '4 - Left Leg',
  '5 - Right Body',
  '6 - Left Body',
  '7 - Overhead',
  '8 - Uppercut',
  '9 - Body Slash / Thrust',
  '10 - Force Push'
];
const icons = [
  '<i class="fa-solid fa-user"></i><i class="fa-solid fa-left-long"></i>', // Icon for '1 - Right Shoulder'
  '<i class="fa-solid fa-right-long"></i><i class="fa-solid fa-user"></i>', // Icon for '2 - Left Shoulder'
  '<i class="fa-solid fa-socks"></i><i class="fa-solid fa-left-long"></i>', // Icon for '3 - Right Leg'
  '<i class="fa-solid fa-right-long"></i><i class="fa-solid fa-socks"></i>', // Icon for '4 - Left Leg'
  '<i class="fa-solid fa-person"></i><i class="fa-solid fa-left-long"></i>', // Icon for '5 - Right Body'
  '<i class="fa-solid fa-right-long"></i><i class="fa-solid fa-person"></i>', // Icon for '6 - Left Body'
  '<i class="fa-solid fa-down-long"></i>', // Icon for '7 - Overhead'
  '<i class="fa-solid fa-up-long"></i>', // Icon for '8 - Uppercut'
  '<i class="fa-solid fa-arrows-to-circle"></i>', // Icon for '9 - Body Slash / Thrust'
  '<i class="fa-solid fa-hand-sparkles"></i>' // Icon for '10 - Force Push'
];

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
    const selectedIcon = icons[strikeIndex];

    if (selectedSide === 'Light') {
      item.classList.add('light-side');
    } else {
      item.classList.add('dark-side');
    }

    item.innerHTML = `
      <span class="side-icon">${selectedSide} ${selectedStrike} ${selectedIcon}</span>
      <div class="button-container">
        <button onclick="switchSides(this)">Switch Sides</button>
        <button onclick="changeStrike(this)">Change Strike</button>
      </div>`;

  });
}

// ------ Switch Sides ------
function switchSides(button) {
  const listItem = button.parentElement.parentElement;

  const sideIconSpan = listItem.querySelector('.side-icon');
  
  const [currentSide, ...strikeParts] = sideIconSpan.textContent.trim().split(' ');
  const strikeText = strikeParts.join(' ');
  
  let newSide;
  if (listItem.classList.contains('light-side')) {
    listItem.classList.remove('light-side');
    listItem.classList.add('dark-side');
    newSide = 'Dark';
  } else {
    listItem.classList.remove('dark-side');
    listItem.classList.add('light-side');
    newSide = 'Light';
  }

  const selectedIconHtml = sideIconSpan.innerHTML.replace(sideIconSpan.textContent.trim(), '');

  listItem.innerHTML = `
    <span class="side-icon">${newSide} ${strikeText} ${selectedIconHtml}</span>
    <div class="button-container">
      <button onclick="switchSides(this)">Switch Sides</button>
      <button onclick="changeStrike(this)">Change Strike</button>
    </div>`;
}

// ------ Change Strike ------
function changeStrike(button) {
  const listItem = button.parentElement.parentElement;

  const modal = document.getElementById("strikeModal");

  modal.style.display = "block";

  const strikeButtonsDiv = document.getElementById("strikeButtons");
  strikeButtonsDiv.innerHTML = ""; 

  for (let i = 0; i < strike.length; i++) {
    const btn = document.createElement("button");
    btn.innerHTML = `${strike[i]}`; 
    btn.onclick = function () {
      applyStrike(listItem, i + 1);
      modal.style.display = "none"; 
    };
    strikeButtonsDiv.appendChild(btn);
  }

  const closeBtn = document.getElementsByClassName("close")[0];
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

// ------ Apply Strike Change ------
function applyStrike(listItem, strikeNumber) {
  const strikeIndex = strikeNumber - 1;

  const sideIconSpan = listItem.querySelector('.side-icon');
  const [currentSide] = sideIconSpan.textContent.trim().split(' ');

  const newStrike = strike[strikeIndex];
  const newIcon = icons[strikeIndex];

  listItem.innerHTML = `
    <span class="side-icon">${currentSide} ${newStrike} ${newIcon}</span>
    <div class="button-container">
      <button onclick="switchSides(this)">Switch Sides</button>
      <button onclick="changeStrike(this)">Change Strike</button>
    </div>`;
}

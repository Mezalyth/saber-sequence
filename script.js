document.getElementById('generate').addEventListener('click', generateAssignments);

function generateAssignments() {
  const assignmentsList = document.getElementById('assignmentList');
  assignmentsList.innerHTML = ''; // Clear the list
  const counts = { 'Jedi': 0, 'Sith': 0 };
  const assignments = []; // This array will hold your Jedi/Sith assignments
  
  // Adjusted probabilities
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8];
  
  for (let i = 0; i < 10; i++) {
    const number = numbers[Math.floor(Math.random() * numbers.length)];
    let assignment = Math.random() < 0.5 ? 'Jedi' : 'Sith';
    
    // Ensure at least 3 of each
    if (counts['Jedi'] < 3 && i >= 7) assignment = 'Jedi';
    if (counts['Sith'] < 3 && i >= 7) assignment = 'Sith';
    
    if (assignment === 'Jedi') counts['Jedi']++;
    if (assignment === 'Sith') counts['Sith']++;
    
    assignments.push({ designation: assignment, number: number });
  }
  
// Iterate over the assignments array and create list items
  assignments.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.designation} ${item.number}`;
    listItem.classList.add(item.designation.toLowerCase()); // Add 'jedi' or 'sith' as a class
    listItem.classList.add('fade-in');
    listItem.style.animationDelay = `${index * 0.1}s`; // Delay each item
    listItem.style.visibility = 'hidden'; // Set visibility to hidden initially

    assignmentsList.appendChild(listItem);

    // Set a timeout to change visibility to visible after the animation ends
    setTimeout(() => {
      listItem.style.visibility = 'visible';
    }, (index * 60) + 400); // The delay should match the animation delay plus the animation duration
  });
}

// Lightspeed Background
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

// Set the canvas to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Generate stars
let stars = [];
for (let i = 0; i < 100; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random(),
    velocity: Math.random() * 3 + 1 // Speed of the star
  });
}

function draw() {
  // Clear the canvas
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw stars
  stars.forEach(star => {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();

    // Update star's y position
    star.y += star.velocity;

    // Reset star to bottom if it goes past the top
    if (star.y > canvas.height) {
      star.x = Math.random() * canvas.width;
      star.y = 0;
      star.velocity = Math.random() * 3 + 1;
    }
  });

  requestAnimationFrame(draw);
}

draw();
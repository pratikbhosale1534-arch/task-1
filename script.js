// Task 1: JavaScript interaction
const welcomeButton = document.getElementById("welcomeButton");

welcomeButton.addEventListener("click", function () {
  alert("Welcome! Thanks for visiting my first web development project.");
});

// Display the current year automatically in the footer.
document.getElementById("year").textContent = new Date().getFullYear();

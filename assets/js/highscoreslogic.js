// Function to check and display all scores
function check() {
  const highscores = document.getElementById("highscores");
  highscores.innerHTML = "";
  
  const storedInputs = JSON.parse(localStorage.getItem("storedInputs")) || [];

  for (let i = 0; i < storedInputs.length; i++) {
    const { initials, score } = storedInputs[i];
    const listItem = document.createElement("li");
    listItem.textContent = `${i + 1}. ${initials} : ${score}`;
    highscores.appendChild(listItem);
   
  }
  const clear = document.getElementById("clear");
  clear.addEventListener("click", function () {
    localStorage.removeItem("storedInputs");
    localStorage.removeItem("finalScoreValue");
    highscores.innerHTML = ""; 
  });
}

// Function to view highscores
function finalCheck() {
check()
}
finalCheck();
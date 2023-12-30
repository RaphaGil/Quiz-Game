const timer = document.querySelector("#time"); // Assuming it's an ID, use # for ID selection
let timeLeft = 60;
function setTime() {
  const timeInterval = setInterval(function () {
    timeLeft--;
    timer.textContent = timeLeft; // Update timer content in each iteration
    if (timeLeft === 0) {
      clearInterval(timeInterval);
      timer.textContent = ""; // Update timer text when time reaches zero
      // Call a function named displayMessage() - you need to define this function
      timeIsOver();
    }
  }, 1000);
}
const start = document.getElementById("start");
if(start){
start.addEventListener("click", callBothFunctions); // Add event listener to start button
}

function callBothFunctions() {
  const hideWrapper = document.getElementById("start-screen");
  hideWrapper.setAttribute("class", "hide");
  setTime();
  displayQuestion();
}

function deductTime() {
  const penalty = 10; // Penalty time in seconds
  if (timeLeft >= penalty) {
    timeLeft -= penalty;
    timer.textContent = timeLeft; // Update timer content after deduction
  } else {
    timeLeft = 0;
    timer.textContent = ""; // Timer reached zero
    timeIsOver();
  }
}
function timeIsOver() {
  const question = document.getElementById("questions");
  if (question) {
    question.style.display = "none"; // Hide the element with the ID 'questions'
    displayMessage("error", "The time is finished!");
  }
}

function displayMessage(status, message) {
  const messageElement = document.createElement("p");
  messageElement.textContent = message;
  messageElement.style.textAlign = 'center';
  messageElement.style.color = 'red';
  // Assuming divQuestion is the container for messages
  document.body.appendChild(messageElement);
}

let currentQuestion = 0;
const questionElement = document.getElementById("question-title");
const choicesElement = document.getElementById("choices");
const resultElement = document.getElementById("result");
const body = document.body;

function displayQuestion() {
  if (quiz && quiz[currentQuestion]) {
    const question = quiz[currentQuestion];
    questionElement.textContent = quiz[currentQuestion].question;
    choicesElement.innerHTML = "";

    for (let i = 0; i < quiz[currentQuestion].choices.length; i++) {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = i + 1 + ". " + quiz[currentQuestion].choices[i];
      li.appendChild(button);
      choicesElement.appendChild(li);
      button.addEventListener("click", function () {
        checkAnswer(button.textContent);
      });
    }
    document.body.appendChild(questionElement);
    document.body.appendChild(choicesElement);
  }
}

let finalScore = 0;
const answeredQuestions = {}; // Object to keep track of answered questions

function checkAnswer(choice) {
  const userChoice = choice.split(" ").pop();
  const correctAnswer = quiz[currentQuestion].answer;
  let correctSound = new Audio(
    "/Users/raphaeladoamaralgil/Desktop/bootcamp/homework/Quiz-Game/starter/assets/sfx/correct.wav"
  );
  correctSound.preload = "auto";
  let incorrectSound = new Audio(
    "/Users/raphaeladoamaralgil/Desktop/bootcamp/homework/Quiz-Game/starter/assets/sfx/incorrect.wav");
  incorrectSound.preload = "auto";

  if (!(currentQuestion in answeredQuestions)) {
    answeredQuestions[currentQuestion] = false; // Initialize the question as unanswered
  }
  if (!answeredQuestions[currentQuestion]) {
    if (userChoice === correctAnswer) {
      resultElement.textContent = "Correct!";
      finalScore++;
      answeredQuestions[currentQuestion] = true;
      resultElement.style.color= 'green'
      resultElement.setAttribute = ('class', 'result')// Mark the question as answered correctly
      correctSound.play();
    } else {
      resultElement.textContent = "Incorrect!";
      resultElement.style.color= 'red';
      finalScore--;
      deductTime()
      incorrectSound.play();
    }
  } else {
    resultElement.textContent = "You've already answered this question.";
  }
  currentQuestion++;

  if (currentQuestion < quiz.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
  document.body.appendChild(resultElement);
}

function endQuiz() {
  const end = document.getElementById("end-screen");
  const input = document.getElementById("initials");
  const submitButton = document.getElementById("submit");
  const finalScoreElement = document.getElementById("final-score");
  finalScoreElement.textContent = finalScore;
  const finalScoreValue = finalScoreElement.textContent;
  
  localStorage.setItem("finalScoreValue", JSON.parse(finalScoreValue));
  questionElement.textContent = "";
  choicesElement.innerHTML = "";
  resultElement.style.display= 'none'
  end.style.display = "block";
  
  submitButton.addEventListener("click", function () {
    const userInitials = input.value.trim();
    if (userInitials !== "") {
      const newData = {
        initials: userInitials,
        score: finalScoreValue
      };
      let storedData = JSON.parse(localStorage.getItem("storedInputs")) || [];

      if (!Array.isArray(storedData)) {
        storedData = [];
      }
      storedData.push(newData);
      localStorage.setItem("storedInputs", JSON.stringify(storedData));
      end.style.display = "none";
      check();
    } else {
      console.log("Please enter initials.");
    }
  });
}

function check() {
  const highscores = document.getElementById("highscores");
  const storedInputs = JSON.parse(localStorage.getItem("storedInputs")) || [];
  highscores.innerHTML = "";

  storedInputs.forEach((data, index) => {
    const { initials, score } = data;
    const listItem = document.createElement("li");
    listItem.textContent = `${index + 1}. ${initials} : ${score}`;
    highscores.appendChild(listItem);
  });

  const clear = document.getElementById("clear");
  const endScreen = document.getElementById("end-screen");
  const wrapper = document.getElementById("wrapper");

  endScreen.classList.add("hide");
  wrapper.classList.remove("hide");

  clear.addEventListener("click", function () {
    localStorage.removeItem("storedInputs");
    localStorage.removeItem("finalScoreValue");
    highscores.innerHTML = ""; // Clear the highscores list
  });
}

function viewHighscore() {
let allScore = document.querySelector(".scores")
let btnCheckAllScore = document.getElementById("click")

  btnCheckAllScore.addEventListener("click", function() {
    // event.preventDefault();
    const highscores = document.getElementById("highscores");
    highscores.innerHTML = ""; // Limpa os dados anteriores

    const storedInputs = JSON.parse(localStorage.getItem("storedInputs")) || [];
    storedInputs.forEach((data, index) => {
      const { initials, score } = data;
      const listItem = document.createElement("li");
      listItem.textContent = `${index + 1}. ${initials} - ${score}`;
      highscores.appendChild(listItem);
      console.log(listItem)
    });
  });
}


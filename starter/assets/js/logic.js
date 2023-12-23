const timer = document.querySelector("#time"); // Assuming it's an ID, use # for ID selection

function setTime() {
  let timeLeft = 60;

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

function displayMessage(status, message) {
  const messageElement = document.createElement("p");
  messageElement.textContent = message;
  // Assuming divQuestion is the container for messages
  document.body.appendChild(messageElement);
}

function timeIsOver() {
  const question = document.getElementById("questions");
  if (question) {
    question.style.display = "none"; // Hide the element with the ID 'questions'
    displayMessage("error", "The time is finished!");
  }
}

const start = document.querySelector(".start");
start.addEventListener("click", callBothFunctions); // Add event listener to start button

function callBothFunctions() {
  const hideWrapper = document.getElementById("start-screen");
  hideWrapper.setAttribute("class", "hide");
  setTime();
  displayQuestion();
}

let currentQuestion = 0;
// const questionDiv = document.getElementById("questions")
const questionElement = document.getElementById("question-title");
const choicesElement = document.getElementById("choices");
const resultElement = document.getElementById("result");
const body = document.body;

function displayQuestion() {
  if (quiz && quiz[currentQuestion]) {
    const question = quiz[currentQuestion];
    const body = document.body;
    questionElement.textContent = quiz[currentQuestion].question;

    choicesElement.innerHTML = "";

    for (let i = 0; i < quiz[currentQuestion].choices.length; i++) {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = (i + 1) + ". " + quiz[currentQuestion].choices[i];
      li.appendChild(button);
      choicesElement.appendChild(li);
      button.addEventListener("click", function () {
        checkAnswer(button.textContent);
      });
    }

    body.appendChild(questionElement);
    body.appendChild(choicesElement);
  }
}

function checkAnswer(choice) {
  const userChoice = choice.split(' ').pop(); 
  const correctAnswer = quiz[currentQuestion].answer;

  if (userChoice === correctAnswer) {
    resultElement.textContent = "Correct!";
    currentQuestion++; 
    displayQuestion(); 
    if (currentQuestion == quiz.length) {
      endQuiz();
    }
  } else {
    resultElement.textContent = "Incorrect! Try again.";
    if (currentQuestion == quiz.length) {
      endQuiz();
    }
  }
  document.body.appendChild(resultElement);
}

function endQuiz() {
  questionElement.textContent = "";
  choicesElement.innerHTML = "";
  const end = document.getElementById("end-screen");
  const score = document.getElementById("final-score");
  hideAllButtons();

  document.body.appendChild(end);
  document.body.appendChild(score);
}

function hideAllButtons() {
  const allButtons = document.querySelectorAll("#choices button");
  allButtons.forEach(button => {
    button.style.display = "none";
  });
}

let finalScore = 0;
const answeredQuestions = {}; // Object to keep track of answered questions

function checkAnswer(choice) {
  const userChoice = choice.split(' ').pop(); 
  const correctAnswer = quiz[currentQuestion].answer;

  if (!(currentQuestion in answeredQuestions)) {
    answeredQuestions[currentQuestion] = false; // Initialize the question as unanswered
  }

  if (!answeredQuestions[currentQuestion]) {
    if (userChoice === correctAnswer) {
      resultElement.textContent = "Correct!";
      finalScore++;
      answeredQuestions[currentQuestion] = true; // Mark the question as answered correctly
    } else {
      resultElement.textContent = "Incorrect! Try again.";
      finalScore--;
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

  console.log('score: ' + finalScore);
  document.body.appendChild(resultElement);
}

function endQuiz() {
  const end = document.getElementById("end-screen");
  questionElement.textContent = "";
  choicesElement.innerHTML = "";
  resultElement.innerHTML=""
  end.style.display = 'block';

const finalScoreValue = finalScore; // Retrieve the score value

  const finalScoreElement = document.getElementById("final-score");
  finalScoreElement.textContent = finalScoreValue;
}


// function hideAllButtons() {
//   const allButtons = document.querySelectorAll("#choices button");
//   allButtons.forEach(button => {
//     button.style.display = "none";
//   })}

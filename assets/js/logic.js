
// Setting timer countdown
const timer = document.querySelector("#time"); 
let timeLeft = 60;
function setTime() {
    // Function to start the timer
  const timeInterval = setInterval(function () {
    timeLeft--;
    timer.textContent = timeLeft; 
    if (timeLeft === 0) {
      clearInterval(timeInterval);
      timer.textContent = ""; 
      timeIsOver();
    }
  }, 1000);
}
// Click the start button to start the timer and questions
const start = document.getElementById("start");
const hideWrapper = document.getElementById("start-screen");
if(start){
start.addEventListener("click",function(){
  hideWrapper.setAttribute("class", "hide");
  setTime();
  displayQuestion();
}); 
}

// Deduct 10s from the timer if the answer is wrong
function deductTime() {
  const penalty = 10; // Penalty time in seconds
  if (timeLeft >= penalty) {
    timeLeft -= penalty;
    timer.textContent = timeLeft;
  } else {
    timeLeft = 0;
    timeIsOver();
  }
}
// Pop message if the time is over and finish the quiz
function timeIsOver() {
  const messageElement = document.createElement("p");
  const question = document.getElementById("questions");
  if (question) {
    timer.textContent = 0;
    question.style.display = "none";
    messageElement.textContent = "The time is finished!";
    messageElement.style.textAlign = 'center';
    messageElement.style.color = 'red';
    document.body.appendChild(messageElement);
    endQuiz()
  }
}

let currentQuestion = 0;
const questionElement = document.getElementById("question-title");
const choicesElement = document.getElementById("choices");
const resultElement = document.getElementById("result");

// Function to display questions
function displayQuestion() {
  if (quiz && quiz[currentQuestion]) {
    questionElement.textContent = quiz[currentQuestion].question;
    choicesElement.innerHTML = "";
// Loop through choices for the current question
    for (let i = 0; i < quiz[currentQuestion].choices.length; i++) {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = i + 1 + ". " + quiz[currentQuestion].choices[i];
      li.appendChild(button);
      choicesElement.appendChild(li);
      button.addEventListener("click", function () {
        checkAnswer(button.textContent)
      });
    }
    document.body.appendChild(questionElement);
    document.body.appendChild(choicesElement);
  }
}
// Function to check user's answer
let finalScore = 0;
const answeredQuestions = {};

function checkAnswer(choice) {
  const userChoice = choice.split(" ").pop();
  const correctAnswer = quiz[currentQuestion].answer;
  const correctSound = new Audio('./assets/sfx/correct.wav');
  const incorrectSound = new Audio ('./assets/sfx/incorrect.wav')
  if (userChoice === correctAnswer) {
     // Handle correct answer scenario
    answeredQuestions[currentQuestion] = true;
    resultElement.textContent = "Correct!";
    resultElement.style.color = 'green';
    finalScore++;
    resultElement.setAttribute('class', 'result');
    correctSound.play()
  } else {
     // Handle incorrect answer scenario
    resultElement.textContent = "Incorrect!";
    resultElement.style.color = 'red';
    finalScore--;
    incorrectSound.play()
    deductTime();// Deduct time for incorrect answer
  
  }
  currentQuestion++;

  if (currentQuestion < quiz.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
  document.body.appendChild(resultElement);
}
// Function to end the quiz and display points and input for user initials
function endQuiz() {
  const end = document.getElementById("end-screen");
  const input = document.getElementById("initials");
  const submitButton = document.getElementById("submit");
  const finalScoreElement = document.getElementById("final-score");
  
  finalScoreElement.textContent = finalScore;
  localStorage.setItem("finalScoreValue", finalScoreElement.textContent);
  
  questionElement.textContent = "";
  choicesElement.innerHTML = "";

  resultElement.style.display= 'none'
  end.style.display = "block";
  

  submitButton.addEventListener("click", function () {
    const userInitials = input.value.trim();
    if (userInitials !== "") {
      const newData = {
        initials: userInitials,
        score: finalScoreElement.textContent
      };
      let storedData = JSON.parse(localStorage.getItem("storedInputs")) || [];
      storedData.push(newData);
      localStorage.setItem("storedInputs", JSON.stringify(storedData));
      
      end.style.display = "none";
      window.location.replace('./highscores.html');
    }})}




  
    
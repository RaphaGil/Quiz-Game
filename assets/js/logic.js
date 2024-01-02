
//setting timer counting
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
//click the start button and start the timer and questions
const start = document.getElementById("start");
const hideWrapper = document.getElementById("start-screen");
if(start){
start.addEventListener("click",function(){
  hideWrapper.setAttribute("class", "hide");
  setTime();
  displayQuestion();
}); // Add event listener to start button
}


function deductTime() {
  const penalty = 10; // Penalty time in seconds
  if (timeLeft >= penalty) {
    timeLeft -= penalty;
    timer.textContent = timeLeft; // Update timer content after deduction
  } else {
    timeLeft = 0;
    // timer.textContent = 0; // Timer reached zero
    timeIsOver();
  }
}
function timeIsOver() {
  const question = document.getElementById("questions");
  if (question) {
    timer.textContent = 0;
    question.style.display = "none";// Hide the element with the ID 'questions'
    displayMessage("error", "The time is finished!");
    endQuiz()
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

function displayQuestion() {
  if (quiz && quiz[currentQuestion]) {
    // const question = quiz[currentQuestion];
    questionElement.textContent = quiz[currentQuestion].question;
    choicesElement.innerHTML = "";

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

let finalScore = 0;
const answeredQuestions = {};

function checkAnswer(choice) {
  const userChoice = choice.split(" ").pop();
  const correctAnswer = quiz[currentQuestion].answer;
  // const correctSound = new Audio('/Users/raphaeladoamaralgil/Desktop/bootcamp/homework/Quiz-Game/starter/assets/sfx/correct.wav');
  // const incorrectSound = new Audio ('/Users/raphaeladoamaralgil/Desktop/bootcamp/homework/Quiz-Game/starter/assets/sfx/incorrect.wav')
  if (userChoice === correctAnswer) {
    answeredQuestions[currentQuestion] = true;
    resultElement.textContent = "Correct!";
    resultElement.style.color = 'green';
    finalScore++;
    resultElement.setAttribute('class', 'result');
    // playSound(correctSound);
  } else {
    resultElement.textContent = "Incorrect!";
    resultElement.style.color = 'red';
    finalScore--;
    // playSound(incorrectSound);
    deductTime();
  
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
  // const wrapper = document.querySelector('#secondWrapper')
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
      end.style.display = "none"
      window.location.replace('./highscores.html')
    }})}




  
    
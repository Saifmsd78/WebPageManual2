// Quiz Questions Array
const questions = [
    {
        question: "Which symbol is used to select an ID in CSS?",
        options: ["#", ".", "*", "@"],
         answer: 0
         },
         {
         question: "The latest major version of HTML is?",
         options: ["HTML 4.01", "XHTML 1.0", "HTML 5"],
       answer: 2
     },
         {
    question: "In JavaScript, '===' checks for value and type equality.",
        options: ["True", "False"],
        answer: 0
         },
        {
     question: "Which HTTP method is used to retrieve data?",
         options: ["POST", "PUT", "GET", "DELETE"],
         answer: 2
     },
         {
         question: "The correct HTML tag for the largest heading is?",
        options: ["<head>", "<h6>", "<heading>", "<h1>"],
        answer: 3
        }
  ];
  // Variables
  let currentIndex = 0;
  let score = 0;
  // DOM Elements
  const startScreen = document.getElementById("start-screen");
  const quizScreen = document.getElementById("quiz-screen");
  const resultScreen = document.getElementById("result-screen");
  const questionText = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options-container");
  const nextBtn = document.getElementById("nextBtn");
  const scoreDisplay = document.getElementById("score");
  const finalMessage = document.getElementById("final-message");
  // Start Quiz
  document.getElementById("startBtn").addEventListener("click", () => {
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    loadQuestion();
  });
  // Load Question
  function loadQuestion() {
    nextBtn.classList.add("hide");
    let q = questions[currentIndex];
    questionText.textContent = q.question;
    optionsContainer.innerHTML = "";
    q.options.forEach((opt, index) => {
      let btn = document.createElement("div");
      btn.classList.add("option");
      btn.textContent = opt;
      btn.onclick = () => checkAnswer(index, btn);
      optionsContainer.appendChild(btn);
    });
  }
  // Check Answer
  function checkAnswer(selected, buttonElement) {
    let correct = questions[currentIndex].answer;
    if (selected === correct) {
      buttonElement.classList.add("correct");
      score++;
    } else {
      buttonElement.classList.add("wrong");
    }
    // Disable all options after answering
    let allOptions = document.querySelectorAll(".option");
    allOptions.forEach(opt => opt.style.pointerEvents = "none");
    nextBtn.classList.remove("hide");
  }
  // Next Question
  nextBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  });
  // Show Results
  function showResult() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    scoreDisplay.textContent = `${score} / ${questions.length}`;
    if (score === questions.length) {
      finalMessage.textContent = "Excellent! You're a Web Tech Master!";
    } else if (score >= questions.length / 2) {
      finalMessage.textContent = "Good Job! Keep Learning!";
    } else {
      finalMessage.textContent = "Try Again! You can do better!";
    }
  }
  // Restart Quiz
  document.getElementById("restartBtn").addEventListener("click", () => {
    score = 0;
    currentIndex = 0;
    resultScreen.classList.remove("active");
    startScreen.classList.add("active");
  });
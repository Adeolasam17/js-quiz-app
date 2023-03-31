const Question = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');
const startBtn = document.getElementById('start-btn');

let Questions = [
  {
    question: "what is the largest animal in the world?",
    answers: [
      { text: "shark", correct: false },
      { text: "blue whale", correct: true },
      { text: "elephant", correct: false },
      { text: "girrafe", correct: false },
    ],
  },
  {
    question: "what is the smallest country in the world?",
    answers: [
      { text: "vatican city", correct: true },
      { text: "isreal", correct: false },
      { text: "nigeria", correct: false },
      { text: "gabon", correct: false },
    ],
  },
  {
    question: "what continent has the largest desert in the world?",
    answers: [
      { text: "kalahari", correct: false },
      { text: "gobi", correct: false },
      { text: "sahara", correct: false },
      { text: "antartica", correct: true },
    ],
  },
  {
    question: "what is the largest continent in the world?",
    answers: [
      { text: "asia", correct: true },
      { text: "artic", correct: false },
      { text: "australia", correct: false },
      { text: "africa", correct: false },
    ],
  },
  {
    question: "how many bones do we have in an ear?",
    answers: [
      { text: "3", correct: true },
      { text: "8", correct: false },
      { text: "1", correct: false },
      { text: "2", correct: false },
    ],
  },
  {
    question: "what is the capital of canada?",
    answers: [
      { text: "vienna", correct: false },
      { text: "calgary", correct: false },
      { text: "montreal", correct: false },
      { text: "ottawa", correct: true },
    ],
  },
  {
    question: "in what country would you find mount kilimanjaro?",
    answers: [
      { text: "america", correct: false },
      { text: "kenya", correct: false },
      { text: "tanzania", correct: true },
      { text: "russia", correct: false },
    ],
  },
  {
    question: "what country has won the most world cups?",
    answers: [
      { text: "brazil", correct: true },
      { text: "france", correct: false },
      { text: "germany", correct: false },
      { text: "spain", correct: false },
    ],
  },
  {
    question: "what company was originally called cadabra?",
    answers: [
      { text: "google", correct: false },
      { text: "amazon", correct: true },
      { text: "microsoft", correct: false },
      { text: "pwc", correct: false },
    ],
  },
  {
    question: "how many minutes are in a full week?",
    answers: [
      { text: "15,000", correct: false },
      { text: "10,000", correct: false },
      { text: "18,000", correct: false },
      { text: "10,080", correct: true },
    ],
  },
];


let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = 'next';
  showQuestion();
}

function showQuestion() {
  resetState();

  let currentQuestion = Questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  Question.innerHTML = questionNo + '. ' + currentQuestion.question;
  

  currentQuestion.answers.forEach((answer) => {
    const Button = document.createElement('button');
    Button.classList.add('btn');
    Button.innerHTML = answer.text;
    answerButtons.appendChild(Button)

    if (answer.correct) {
      Button.dataset.correct = answer.correct;
    }

    Button.addEventListener('click', (event) => {
      const selectedBtn = event.target
      const isCorrect = selectedBtn.dataset.correct === 'true';
      if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
      } else {
        selectedBtn.classList.add('incorrect');
      }

      Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
          Button.classList.add("correct");
        }
        button.disabled = true;
        nextBtn.style.display = "block";
      })
    })
  })  
}

function resetState() {
  nextBtn.style.display = 'none';
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function showScore() {
  resetState();
  Question.innerHTML = `<center>questions : ${Questions.length}
  </br>
  </br>
  wrong : ${Questions.length - score}
  </br>
  </br>
  correct : ${score}  
  </br>
  </br>
  your quiz percentage is ${(score / Questions.length) * 100}%!</br></center>`;
  nextBtn.innerHTML = 'take quiz again';
  nextBtn.style.display = 'block';
}

function handleNextBtn() {
  currentQuestionIndex++;
  if (currentQuestionIndex < Questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener('click', () => {
  if (currentQuestionIndex < Questions.length) {
    handleNextBtn();
  } else {
    startQuiz();
  }

  if (currentQuestionIndex === Questions.length - 1) {
    nextBtn.innerHTML = 'check score';
  }
})

startQuiz();

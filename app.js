/* ******** Some Initial values ********* */

let playing = false;
let score = 0;
let countdown = 60;

/* ******** Query Selector f() by className ********* */
const queryS = (className) => document.querySelector(`.${className}`);

/* ******** Some Elements ********* */

const timeRemainingBox = queryS("timeRemainingBox");
const answerButtons = document.querySelectorAll(".box");
const scoreElement = queryS("scoreValue");
const questionBox = queryS('questionBox');
const gameOverValue = queryS("gameOverValue");
const correct = queryS("correct");
const wrong = queryS("wrong");

/* ******** Set an EL to the Start Button and checking whether we are already playing or not.
            If we are playing then reloading() the page.
            If not then starting the game
          ********* */

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", () => {
  if (playing) {
    location.reload();
  } else {
    playing = true;
    startButton.innerText = "Reset Game";
    timeRemainingBox.style.visibility = "visible";
    questionBox.style.fontSize = '6.5rem';
    questionBox.style. paddingTop = '0.7rem';
    updateTime();
    generateQA();
    checkAnswer();
  }
});

/* ******** This will generate new Q & A and add inside the answer buttons and QuestionBox ********* */

let correctAnswer = "";
const generateQA = () => {
  //  Creating question and a correct answer
  const x = Math.round(Math.random() * 9) + 1;
  const y = Math.round(Math.random() * 9) + 1;
  correctAnswer = x * y;
  document.getElementById("question").innerText = `${x} X ${y}`;

  // Fill one box with the correct answer and cerate correct a position
  const correctPosition = Math.round(Math.random() * 3) + 1;
  document.querySelector(`.box${correctPosition}`).innerText = correctAnswer;

  //Calling the  WrongAnswer f()
  generateWrongAnswer(correctPosition);
};

/* ******** Check The answer ********* */

const checkAnswer = () => {
  answerButtons.forEach((answerButton) => {
    answerButton.addEventListener("click", function () {
      if (this.innerText == correctAnswer) {
        score += 1;
        scoreElement.innerText = score;
        gameOverValue.innerText = score;
        autoHideShow("correct");
        generateQA();
      } else {
        autoHideShow("wrong");
      }
    });
  });
};

const autoHideShow = (action) => {
  if (action === "correct") {
    hide("wrong");
    show("correct");
    setTimeout(() => {
      hide("correct");
    }, 1000);
  } else if (action === "wrong") {
    hide("correct");
    show("wrong");
    setTimeout(() => {
      hide("wrong");
    }, 1000);
  }
};

/* ******** An atomic f() to Fill the answer boxes with wrong answer ********* */

const generateWrongAnswer = (correctPosition) => {
  const answers = [correctAnswer];
  for (let i = 1; i <= 4; i++) {
    let wrongAnswer;
    if (i !== correctPosition) {
      do {
        wrongAnswer =
          (Math.round(Math.random() * 9) + 1) *
          (Math.round(Math.random() * 9) + 1);
      } while (answers.includes(wrongAnswer));
      {
        answers.push(wrongAnswer);
        wrongAnswer = document.querySelector(`.box${i}`).innerText =
          wrongAnswer;
      }
    }
  }
};
/* ******** A f() to update time remaining and checking if there is time left. 
            When time is over call the gameOver f() ********* */

const updateTime = () => {
  const timeRemainingElement = document.getElementById("timeRemaining");
  let interval = setInterval(() => {
    countdown -= 1;
    timeRemainingElement.innerText = countdown;
    if (countdown === 0) {
      gameOver();
      clearInterval(interval);
    }
  }, 1000);
};

/* ******** Some Utility f() to show & hide element ********* */

const show = (className) => {
  document.querySelector(`.${className}`).style.display = "block";
};
const hide = (className) => {
  document.querySelector(`.${className}`).style.display = "none";
};

/* ******** When The time is over Then this f() will be called ********* */

const gameOver = () => {
  show("gameOver");
  hide('correct');
  hide('wrong');
  timeRemainingBox.style.visibility = "hidden";
  answerButtons.forEach((answerButton) => {
    answerButton.disabled = true;
    answerButton.innerText = '';
  });
};

// Game Logic

/* If we click on the start reset button
    if we are playing
      reload the page
    if not 
      update time
      if there is time left then
        continue
      else 
        game over

      change the button text to reset
      generate new QA 
      
    if we click on answer box
      if we are playing 
        if the answer is correct
        yes ==> score++;
              correct box 1s;
              generate new QA;
        no ==> try again 1s;
    */

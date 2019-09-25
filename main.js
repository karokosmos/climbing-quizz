const displayQuestionContent = questionNum => {
  const displayedOptions = [...document.querySelectorAll('.option__text')];
  const displayedQuestion = document.querySelector('.question');
  // Display current question and options
  displayedQuestion.textContent = questions[questionNum].question;
  displayedOptions.forEach((option, index) => {
    option.textContent = questions[questionNum].options[index];
  });
}

const updateQuestionContent = _ => {
  const nextQuestion = parseInt(quizz.dataset.index) + 1;
  displayQuestionContent(nextQuestion);
  quizz.dataset.index = nextQuestion;
}

const checkAnswer = answer => {
  const currentQuestion = parseInt(quizz.dataset.index);
  const optionsArr = [...document.querySelectorAll('.option')];
  const answerInd = optionsArr.findIndex(option => option === answer);
  const pointsReceived = document.querySelector('.points__received');

  // If last question, end quizz
  if (currentQuestion === 9) {
    endQuizz(pointsReceived.textContent);
    // Else check the answer and update points and question
  } else if (questions[currentQuestion].rightAnswer === answerInd) {
    pointsReceived.textContent === '0'
      ? pointsReceived.textContent = 1
      : pointsReceived.textContent = parseInt(pointsReceived.textContent) + 1;
    updateQuestionContent();
  } else {
    updateQuestionContent();
  }
}

const endQuizz = totalPoints => {
  const end = document.querySelector('.end');
  const total = end.querySelector('.total');
  const btn = end.querySelector('.btn');

  total.textContent = `Sait ${totalPoints} / 10 pistettä!`;
  end.classList.remove('is-hidden');

  btn.addEventListener('click', e => {
    end.classList.add('is-hidden');
    displayQuestionContent(0);
  });
}

// Show the first question right away
displayQuestionContent(0);

const quizz = document.querySelector('.quizz');
const optionsList = document.querySelector('.options');

optionsList.addEventListener('click', e => {
  if (!e.target.closest('li')) return;
  const answer = e.target.closest('li');
  checkAnswer(answer);
});

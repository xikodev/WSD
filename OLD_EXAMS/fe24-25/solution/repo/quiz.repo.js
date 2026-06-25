const quiz = require('../quiz');

function getQuiz() {
  return quiz;
}

function getQuestionCount() {
  return quiz.questions.length;
}

function getQuestionByNumber(questionNumber) {
  return quiz.questions[questionNumber - 1] || null;
}

module.exports = {
  getQuiz,
  getQuestionCount,
  getQuestionByNumber
};

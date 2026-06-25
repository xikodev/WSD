const express = require('express');
const { getQuiz, getQuestionCount } = require('../repo/quiz.repo');

const router = express.Router();

router.get('/', (req, res) => {
  const quiz = getQuiz();

  res.render('home', {
    quiz,
    questionCount: getQuestionCount()
  });
});

module.exports = router;

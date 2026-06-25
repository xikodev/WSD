const express = require('express');
const { getQuiz, getQuestionByNumber, getQuestionCount } = require('../repo/quiz.repo');

const router = express.Router();

function getActiveQuestionNumber(req) {
  return (req.session.currentQuestionIndex || 0) + 1;
}

function isQuizStarted(req) {
  return typeof req.session.currentQuestionIndex === 'number';
}

function renderQuestion(res, quiz, questionNumber, errorMessage) {
  const question = getQuestionByNumber(questionNumber);

  if (!question) {
    return res.redirect('/');
  }

  return res.render('question', {
    quiz,
    question,
    questionNumber,
    totalQuestions: getQuestionCount(),
    errorMessage
  });
}

router.get('/start', (req, res) => {
  req.session.currentQuestionIndex = 0;
  req.session.correctAnswers = 0;

  res.redirect('/quiz/question/1');
});

router.get('/question/:num', (req, res) => {
  const quiz = getQuiz();
  const requestedNumber = Number(req.params.num);

  if (!isQuizStarted(req)) {
    return res.redirect('/quiz/start');
  }

  if (!Number.isInteger(requestedNumber) || requestedNumber < 1) {
    return res.redirect(`/quiz/question/${getActiveQuestionNumber(req)}`);
  }

  const activeQuestionNumber = getActiveQuestionNumber(req);

  if (requestedNumber !== activeQuestionNumber) {
    return res.redirect(`/quiz/question/${activeQuestionNumber}`);
  }

  return renderQuestion(res, quiz, requestedNumber);
});

router.post('/question/:num/answer', (req, res) => {
  const quiz = getQuiz();
  const requestedNumber = Number(req.params.num);
  const activeQuestionNumber = getActiveQuestionNumber(req);

  if (!isQuizStarted(req)) {
    return res.redirect('/quiz/start');
  }

  if (requestedNumber !== activeQuestionNumber) {
    return res.redirect(`/quiz/question/${activeQuestionNumber}`);
  }

  if (req.body.answer === undefined) {
    return renderQuestion(
      res,
      quiz,
      requestedNumber,
      'Please select an answer before continuing.'
    );
  }

  const question = getQuestionByNumber(requestedNumber);
  const selectedAnswer = Number(req.body.answer);

  if (question && selectedAnswer === question.correctAnswer) {
    req.session.correctAnswers += 1;
  }

  req.session.currentQuestionIndex += 1;

  if (req.session.currentQuestionIndex >= getQuestionCount()) {
    return res.redirect('/quiz/results');
  }

  return res.redirect(`/quiz/question/${getActiveQuestionNumber(req)}`);
});

router.get('/results', (req, res) => {
  if (!isQuizStarted(req)) {
    return res.redirect('/');
  }

  if (req.session.currentQuestionIndex < getQuestionCount()) {
    return res.redirect(`/quiz/question/${getActiveQuestionNumber(req)}`);
  }

  const quiz = getQuiz();
  const totalQuestions = getQuestionCount();
  const correctAnswers = req.session.correctAnswers || 0;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  req.session.destroy(() => {
    res.render('results', {
      quiz,
      totalQuestions,
      correctAnswers,
      percentage
    });
  });
});

module.exports = router;

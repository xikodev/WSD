const express = require('express');
const path = require('path');
const session = require('express-session');

const homeRoutes = require('./routes/home.routes');
const quizRoutes = require('./routes/quiz.routes');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'quiz-app-secret',
    resave: false,
    saveUninitialized: true
  })
);

app.use('/', homeRoutes);
app.use('/quiz', quizRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});

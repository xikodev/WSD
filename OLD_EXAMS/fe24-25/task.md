# Final Exam 2024/2025 programming task

A simple Node.js web application needs to be created that allows users to solve a quiz with questions. The application
uses the Express framework for route handling, EJS for rendering views, and Express-Session for tracking quiz state.

The project structure is as follows:

```
quiz-app/
├── public/css/
│   └── style.css
├── routes/
│   ├── home.routes.js
│   └── quiz.routes.js
├── views/
│   ├── home.ejs
│   ├── question.ejs
│   └── results.ejs
├── repo/
│   └── quiz.repo.js
├── package.json
└── server.js
```

The required functionality is as shown in the attached video zi-demo.mp4. The user answers questions one by one, and
cannot proceed to the next question without answering the current one, as ensured by displaying a message as shown in
the video. If the user tries to skip a question, the current unanswered question is shown again. At the end, the result
is displayed with the number of correct answers and the success percentage. During the session, it is necessary to track
the index of the current question and the number of correct answers.

The following routes should be implemented:

```
'/' - fetch the homepage with information about the quiz
'/quiz/start' - start the quiz (initialize session)
'/quiz/question/:num' - display a question
'/quiz/question/:num/answer' - submit an answer
'/quiz/results' - display quiz results
```

The demonstration and test quiz contains 6 questions from different categories with multiple choice answers. It is
provided in the attachment `quiz-starter.zip` as a JSON object in the file `quiz.js`. The repository should be
implemented so that it works with any quiz JSON object that follows the structure of the provided example.

The application should be styled with a simple, clean design. A ready-made CSS file and static HTML examples with
applied styles are provided with the task (`quiz-static.zip`) and should be used as a reference when creating the views.

Functionality check
Before submission, make sure that:

- The application starts `with node server.js`
- The homepage loads
- The quiz starts
- Questions are displayed in order
- Answers are stored in the session
- Navigation works (next question)
- Results are calculated correctly
- The session is cleared after displaying results
- The "Try again" functionality works

Technical notes:

- Since you are on a restricted network, the skeleton project containing pre-installed `express`, `express-session`, and
  `ejs` is provided (`quiz-starter.zip`)
- The application listens on port `8080`
- The session is automatically cleared after displaying results
- The application uses an in-memory repository (mock data)

How to submit the task:

1. In the text field, write a comment stating what from the requirements has (not) been implemented.
2. Attach a zip of the project WITHOUT the `node_modules` directory
    - Make sure to attach the file correctly and check it afterwards in the review system.
    - Subsequent complaints (files) will not be accepted!'

Note: Before uploading, make sure to delete the `node_modules` directory.

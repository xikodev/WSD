const express = require('express');
const {
  getCategories,
  addTodo,
  deleteTodo,
  getGroupedTodos,
  getSessionTodoCount,
  getTotalTodoCount
} = require('../repo/todo.repo');

const router = express.Router();

function renderHome(req, res, formData = {}, errorMessage = null, statusCode = 200) {
  res.status(statusCode).render('home', {
    categories: getCategories(),
    groupedTodos: getGroupedTodos(req),
    personalCount: getSessionTodoCount(req),
    totalCount: getTotalTodoCount(),
    errorMessage,
    formData: {
      category: formData.category || getCategories()[0],
      description: formData.description || ''
    }
  });
}

router.get('/', (req, res) => {
  renderHome(req, res);
});

router.post('/todos', (req, res) => {
  const category = req.body.category;
  const description = req.body.description ? req.body.description.trim() : '';

  if (!getCategories().includes(category) || !description) {
    return renderHome(
      req,
      res,
      { category, description },
      'Please select a valid category and enter a description.',
      400
    );
  }

  addTodo(req, category, description);
  return res.redirect('/');
});

router.post('/todos/:id/delete', (req, res) => {
  deleteTodo(req, Number(req.params.id));
  res.redirect('/');
});

module.exports = router;

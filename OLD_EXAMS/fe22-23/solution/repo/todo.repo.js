const categories = ['Work', 'Movies and books', 'Fun', 'Sports'];

let nextTodoId = 1;
let totalTodos = 0;

function ensureSessionTodos(req) {
  if (!Array.isArray(req.session.todos)) {
    req.session.todos = [];
  }

  return req.session.todos;
}

function getCategories() {
  return categories;
}

function getSessionTodos(req) {
  return ensureSessionTodos(req);
}

function addTodo(req, category, description) {
  const todos = ensureSessionTodos(req);
  const todo = {
    id: nextTodoId++,
    category,
    description,
    createdAt: new Date()
  };

  todos.push(todo);
  totalTodos += 1;
  return todo;
}

function deleteTodo(req, todoId) {
  const todos = ensureSessionTodos(req);
  const index = todos.findIndex((todo) => todo.id === todoId);

  if (index === -1) {
    return false;
  }

  todos.splice(index, 1);
  totalTodos -= 1;
  return true;
}

function getGroupedTodos(req) {
  const todos = ensureSessionTodos(req);

  return categories.map((category) => ({
    category,
    todos: todos.filter((todo) => todo.category === category)
  }));
}

function getSessionTodoCount(req) {
  return ensureSessionTodos(req).length;
}

function getTotalTodoCount() {
  return totalTodos;
}

module.exports = {
  getCategories,
  getSessionTodos,
  addTodo,
  deleteTodo,
  getGroupedTodos,
  getSessionTodoCount,
  getTotalTodoCount
};

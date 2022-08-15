const serverAddress = 'http://localhost:8000';

const formatTodo = ({
  id,
  title,
  description,
  category,
  categoryId,
  completed,
}) => ({
  id,
  title,
  description,
  category: category.title,
  categoryId,
  completed,
});

const fetchAll = async () => {
  const response = await fetch(`${serverAddress}/todos?_expand=category`);
  const todos = await response.json();

  return todos.map(formatTodo);
};

const fetchCategories = async () => {
  const response = await fetch(`${serverAddress}/categories`);
  const categories = await response.json();

  return categories;
};

const create = async (todoProps) => {
  const response = await fetch(`${serverAddress}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoProps),
  });

  const todo = await response.json();

  return todo;
};

const remove = async (id) => {
  await fetch(`${serverAddress}/todos/${id}`, {
    method: 'DELETE',
  });

  return true;
};

const update = async (id, todoProps) => {
  const response = await fetch(`${serverAddress}/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoProps),
  });

  const todo = await response.json();

  return todo;
};

const handleComplete = async (id, complete) => {
  const response = await fetch(`${serverAddress}/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ completed: complete }),
  });

  const completed = await response.json();

  return completed;
};

const ApiService = {
  fetchAll,
  fetchCategories,
  create,
  remove,
  update,
  handleComplete,
};

export default ApiService;

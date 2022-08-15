import * as React from 'react';
import {
  Box,
  Button,
  Drawer,
  Typography,
} from '@mui/material';
import { TodosContainer, Todo, TodoAddForm } from 'components';
import ApiService from 'services/api-service';

const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todoToUpdate, setTodoToUpdate] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const onDrawerClose = () => {
    setDrawerOpen(false);
    setTodoToUpdate(null);
  };

  const fetchAllTodos = async () => {
    const fetchedTodos = await ApiService.fetchAll();
    setTodos(fetchedTodos);
  };

  const createTodo = async (todoProps) => {
    await ApiService.create(todoProps);
    await fetchAllTodos();
    onDrawerClose();
  };

  const deleteTodo = async (id) => {
    const itemDeleted = await ApiService.remove(id);
    if (itemDeleted) {
      const fetchedTodos = await ApiService.fetchAll();
      setTodos(fetchedTodos);
    }
  };

  const editTodo = (id) => {
    const foundTodo = todos.find((todo) => todo.id === id);
    setTodoToUpdate(foundTodo);
    setDrawerOpen(true);
  };

  const updateTodo = async (todoProps) => {
    await ApiService.update(todoToUpdate.id, todoProps);
    await fetchAllTodos();
    onDrawerClose();
  };

  const updateComplete = async (id) => {
    const foundTodo = todos.find((todo) => todo.id === id);
    setTodoToUpdate(foundTodo);
    await ApiService.handleComplete(foundTodo.id, !foundTodo.completed);
    await fetchAllTodos();
  };

  React.useEffect(() => {
    fetchAllTodos();
  }, []);

  return (
    <Box sx={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      mt: 15,
    }}
    >
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => onDrawerClose()}
        PaperProps={{
          sx: {
            p: 4,
            width: '400px',
            mx: 'auto',
          },
        }}
      >
        <TodoAddForm
          onSubmit={todoToUpdate ? updateTodo : createTodo}
          initButtonColor={todoToUpdate ? 'warning' : 'success'}
          initButtonText={todoToUpdate ? 'Update' : 'ADD'}
          initFormTitle={todoToUpdate ? 'Update your todo...' : 'Add todo...'}
          initValues={todoToUpdate}
        />
      </Drawer>
      <Button
        variant="contained"
        onClick={() => setDrawerOpen(!drawerOpen)}
        sx={{
          position: 'absolute',
          top: 20,
          width: '400px',
          boxShadow: '0px 0px 6px 6px white',
        }}
      >
        ADD A TODO
      </Button>
      <TodosContainer>
        <Typography
          variant="h4"
          sx={{ color: 'common.white' }}
        >
          {todos.length ? 'Tasks for today..' : 'Click button above to add..'}
        </Typography>
        {todos.map(({
          id,
          title,
          description,
          completed,
          category,
        }) => (
          <Todo
            key={id}
            title={title}
            description={description}
            completed={completed}
            category={category}
            onDelete={() => deleteTodo(id)}
            onUpdate={() => editTodo(id)}
            onComplete={() => updateComplete(id)}
          />
        ))}
      </TodosContainer>
    </Box>
  );
};

export default App;

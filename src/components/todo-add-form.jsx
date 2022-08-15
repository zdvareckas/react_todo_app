import * as React from 'react';
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import ApiService from 'services/api-service';

const TodoAddForm = ({
  initButtonColor,
  initFormTitle,
  initButtonText,
  initValues,
  onSubmit,
}) => {
  const [todoTitle, setTodoTitle] = React.useState(initValues?.title ?? '');
  const [categoryId, setCategoryId] = React.useState(initValues?.categoryId ?? '');
  const [description, setDescription] = React.useState(initValues?.description ?? '');
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const fethedCategories = await ApiService.fetchCategories();
      setCategories(fethedCategories);
    })();
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    onSubmit({
      title: todoTitle,
      categoryId,
      description,
      completed: false,
    });
  };

  return (
    <Box
      onSubmit={handleForm}
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
      }}
    >
      <Typography textAlign="center" variant="h5">{initFormTitle}</Typography>
      <TextField
        label="Todo title"
        name="todoTitle"
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
      />
      <TextField
        label="Category"
        name="category"
        select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        {categories.map(({ id, title }) => (
          <MenuItem key={id} value={id}>{title}</MenuItem>
        ))}
      </TextField>
      <TextField
        label="Description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color={initButtonColor}
      >
        {initButtonText}
      </Button>
    </Box>
  );
};

export default TodoAddForm;

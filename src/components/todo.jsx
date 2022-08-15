import * as React from 'react';
import {
  Box,
  IconButton,
  Chip,
  Typography,
} from '@mui/material';
import { TodoContent } from 'components';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Todo = ({
  title,
  description,
  completed,
  category,
  onDelete,
  onUpdate,
  onComplete,
}) => (
  <TodoContent>
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
    }}
    >
      <IconButton
        disabled={completed}
        onClick={() => onComplete()}
      >
        <CheckCircleIcon sx={{
          color: `${completed === true ? 'green' : 'common.white'}`,
        }}
        />
      </IconButton>
      <IconButton
        disabled={!completed}
        onClick={() => onComplete()}
      >
        <CheckCircleIcon sx={{
          color: `${completed === false ? 'red' : 'common.white'}`,
        }}
        />
      </IconButton>
    </Box>

    <Box sx={{ width: '100%', mx: 2 }}>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="body2">
        {description}
      </Typography>
      <Chip
        label={category}
        sx={{
          position: 'absolute',
          top: '-15px',
          right: 20,
          backgroundColor: `${category === 'Important' ? 'red' : 'green'}`,
        }}
      />
    </Box>

    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
    }}
    >
      <IconButton sx={{ color: 'white' }} onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
      <IconButton sx={{ color: 'white' }} onClick={onUpdate}>
        <EditIcon />
      </IconButton>
    </Box>
  </TodoContent>

);

export default Todo;

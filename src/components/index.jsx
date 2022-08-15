import { Box, styled } from '@mui/material';

export { default as Todo } from './todo';
export { default as TodoAddForm } from './todo-add-form';

export const TodoContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  borderRadius: theme.spacing(3),
  width: '500px',
  padding: theme.spacing(2),
  color: theme.palette.common.white,
  backgroundColor: theme.palette.grey[800],
}));

export const TodosContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(5),
  margin: theme.spacing(5),
  gap: theme.spacing(3),
  border: '1px solid white',
  boxShadow: '0px 0px 6px 6px white',
}));

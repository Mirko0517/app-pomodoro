import React, { useState, ChangeEvent } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Checkbox,
  Paper,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
      };
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: 400, width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Tasks
      </Typography>
      <Box component="form" onSubmit={handleAddTodo} sx={{ display: 'flex', mb: 2 }}>
        <TextField
          fullWidth
          size="small"
          value={newTodo}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
          variant="outlined"
        />
        <IconButton type="submit" color="primary" sx={{ ml: 1 }}>
          <AddIcon />
        </IconButton>
      </Box>
      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            dense
            sx={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              opacity: todo.completed ? 0.7 : 1,
            }}
          >
            <Checkbox
              edge="start"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
            />
            <ListItemText primary={todo.text} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TodoList; 
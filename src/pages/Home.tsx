import React, { useState } from 'react';
import { Container, Paper, Box, Typography, useTheme } from '@mui/material';
import Timer from '../components/Timer';
import TodoList from '../components/TodoList';

const Home: React.FC = () => {
  const theme = useTheme();
  const [isBreak, setIsBreak] = useState(false);
  
  // 25 minutes for work, 5 minutes for break
  const workTime = 25 * 60;
  const breakTime = 5 * 60;

  const handleTimerComplete = () => {
    setIsBreak(!isBreak);
    // Here we would trigger a notification
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(isBreak ? 'Break time is over!' : 'Time for a break!');
        }
      });
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          <Box sx={{ flex: '1 1 auto', minWidth: '300px', flexBasis: '66.666%' }}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: theme.palette.background.paper,
                height: '100%',
              }}
            >
              <Typography variant="h4" gutterBottom>
                {isBreak ? 'Break Time' : 'Focus Time'}
              </Typography>
              <Timer
                initialTime={isBreak ? breakTime : workTime}
                onComplete={handleTimerComplete}
                isBreak={isBreak}
              />
            </Paper>
          </Box>
          <Box sx={{ flex: '1 1 auto', minWidth: '300px', flexBasis: '33.333%' }}>
            <TodoList />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Home; 
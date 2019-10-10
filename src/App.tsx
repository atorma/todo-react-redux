import React from 'react';
import './App.css';
import TodoPage from './todos/TodoPage';
import { Container } from '@material-ui/core';

const App: React.FunctionComponent = () => {
  return (
    <Container maxWidth="sm">
      <TodoPage />
    </Container>
  );
};

export default App;

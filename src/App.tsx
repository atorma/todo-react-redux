import React from 'react';
import './App.css';
import TodoPage from './todos/TodoPage';

const App: React.FunctionComponent = () => {
  return (
    <section className="App">
      <h1>Todo app</h1>
      <TodoPage />
    </section>
  );
};

export default App;

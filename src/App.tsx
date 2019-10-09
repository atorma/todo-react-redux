import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import TodoPage from './todos/TodoPage';

const App: React.FunctionComponent = () => {
  return (
    <section className="App">
      <h1>Todo app</h1>
      <TodoPage />
    </section>
  );
};

export default connect()(App);

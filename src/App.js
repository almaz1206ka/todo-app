import './App.css';
import React from 'react';

import TaskContainer from './components/TaskContainer';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <TaskContainer />
      </div>
    );
  }
};

export default App;
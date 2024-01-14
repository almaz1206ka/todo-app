import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { formatDistanceToNow } from 'date-fns';

import NewTaskForm from './NewTaskForm.jsx';
import TaskList from './TaskList.jsx';
import Footer from './Footer.jsx';

class TaskContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      id: uuidv4(),
      tasks: [],
      taskLeft: 0
    };
  }

  handleChange = (event) => {
    if (event.target.value !== '') {
      this.setState({
        task: event.target.value
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const newItem = {
      task: this.state.task,
      editInput: '',
      id: this.state.id,
      checked: false,
      visible: true,
      edit: false,
      date: new Date(),
      createTime: 'now'
    };
    const updateItem = [newItem, ...this.state.tasks];
    if (event.target.value && event.key === 'Enter') {
      event.target.value = '';
      this.setState({
        tasks: updateItem,
        id: uuidv4(),
        edit: false,
        checked: this.state.checked
      });
    }
  };

  reloadTimer = () => {
    if (this.state.tasks.length > 0) {
      const timer = this.state.tasks.map(
        (item) =>
          item && { ...item, createTime: formatDistanceToNow(item.date, { addSuffix: true, includeSeconds: true }) }
      );
      this.setState({
        tasks: timer
      });
    }
  };

  componentDidUpdate() {
    this.countTimer = setInterval(() => this.tasksLeft());
  }

  componentWillUnmount() {
    clearInterval(this.countTimer);
  }

  deleteTask = (id) => {
    const filteredItems = this.state.tasks.filter((item) => item.id !== id);
    this.setState({
      tasks: filteredItems
    });
  };

  editTask = (id) => {
    const selectedTask = this.state.tasks.map((item) =>
      item.id === id && item.edit === false ? { ...item, edit: true } : { ...item, edit: false }
    );
    this.setState({
      tasks: selectedTask
    });
  };

  editTaskInput = (e) => {
    if (e.target.value !== '') {
      this.setState({
        editInput: e.target.value
      });
    }
  };

  editTaskSubmit = (e) => {
    e.preventDefault();
    const selectedTask = this.state.tasks.map((item) =>
      item.edit === true ? { ...item, edit: false, task: this.state.editInput, date: new Date() } : { ...item }
    );
    if (e.key === 'Enter') {
      this.setState({
        tasks: selectedTask
      });
    }
  };

  checkboxChange = (id) => {
    const selectedTask = this.state.tasks.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : { ...item }
    );
    this.setState({
      tasks: selectedTask
    });
  };

  clearList = () => {
    const completedTask = this.state.tasks.filter((item) => item.checked !== true);
    this.setState({
      tasks: completedTask
    });
  };

  allList = () => {
    const selectedTask = this.state.tasks.map((item) => item && { ...item, visible: true });
    this.setState({
      tasks: selectedTask
    });
  };

  activeList = () => {
    const selectedTask = this.state.tasks.map((item) =>
      item.checked === false ? { ...item, visible: true } : { ...item, visible: false }
    );
    this.setState({
      tasks: selectedTask
    });
  };

  completedList = () => {
    const selectedTask = this.state.tasks.map((item) =>
      item.checked !== false ? { ...item, visible: true } : { ...item, visible: false }
    );
    const completedCount = this.state.tasks.filter((item) => item.checked === true).length;
    if (completedCount !== 0) {
      this.setState({
        tasks: selectedTask
      });
    }
  };

  tasksLeft = () => {
    const findedTask = this.state.tasks.filter((item) => item.checked === false);
    this.setState({
      taskLeft: findedTask.length
    });
  };

  render() {
    return (
      <section className="todoapp">
        <NewTaskForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
        <TaskList
          tasks={this.state.tasks}
          task={this.state.task}
          checkboxChange={this.checkboxChange}
          editTask={this.editTask}
          editTaskInput={this.editTaskInput}
          editTaskSubmit={this.editTaskSubmit}
          reloadTimer={this.reloadTimer}
          deleteTask={this.deleteTask}
        />
        <Footer
          clearTasks={this.clearList}
          allList={this.allList}
          activeList={this.activeList}
          completedList={this.completedList}
          tasksLeft={this.state.taskLeft}
        />
      </section>
    );
  }
}

export default TaskContainer;
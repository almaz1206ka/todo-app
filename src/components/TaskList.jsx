import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Task from './Task';

class TaskList extends PureComponent {
  render() {
    const { tasks, checkboxChange, editTask, editTaskInput, editTaskSubmit, deleteTask, reloadTimer } = this.props;
    return (
      <section className="main">
        <ul className="todo-list" onKeyUp={(e) => editTaskSubmit(e)}>
          <Task
            tasks={tasks}
            checkboxChange={checkboxChange}
            editTask={editTask}
            editTaskInput={editTaskInput}
            editTaskSubmit={editTaskSubmit}
            reloadTimer={reloadTimer}
            deleteTask={deleteTask}
          />
        </ul>
      </section>
    );
  }
};

TaskList.propTypes = {
  tasks: PropTypes.array,
  checkboxChange: PropTypes.func,
  editTask: PropTypes.func,
  editTaskInput: PropTypes.func,
  editTaskSubmit: PropTypes.func,
  getTime: PropTypes.func,
  deleteTask: PropTypes.func
};

export default TaskList;
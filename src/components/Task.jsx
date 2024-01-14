import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Task extends Component {
  constructor(props) {
    super(props);
    let { reloadTimer } = this.props;
    this.reloadTimer = reloadTimer;
  }

  componentDidUpdate() {
    this.timerID = setInterval(() => this.reloadTimer(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const { tasks, checkboxChange, editTask, editTaskInput, deleteTask } = this.props;
    return tasks.map((item) => {
      return (
        item.visible && (
          <li key={item.id} className={`${item.checked ? 'completed' : ''} ${item.edit ? 'editing' : ''}`}>
            <div className="view">
              <input
                className="toggle"
                name="isChecked"
                type="checkbox"
                defaultChecked={item.checked}
                onClick={() => checkboxChange(item.id)}
              />
              <label>
                <span className="description">{item.task}</span>
                <span className="created">created {item.createTime}</span>
              </label>
              <button className="icon icon-edit" onClick={() => editTask(item.id)}></button>
              <button className="icon icon-destroy" onClick={() => deleteTask(item.id)}></button>
            </div>
            {item.edit && (
              <input
                type="text"
                autoFocus
                defaultValue={item.task}
                className="edit"
                onChange={(e) => editTaskInput(e)}
              />
            )}
          </li>
        )
      );
    });
  }
};

Task.propTypes = {
  tasks: PropTypes.array,
  checkboxChange: PropTypes.func,
  editTask: PropTypes.func,
  editTaskInput: PropTypes.func,
  getTime: PropTypes.func,
  deleteTask: PropTypes.func,
  reloadTimer: PropTypes.func
};
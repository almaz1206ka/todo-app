import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import TasksFilter from './TasksFilter';

class Footer extends PureComponent {
  render() {
    const { clearTasks, allList, activeList, completedList, tasksLeft } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{`${tasksLeft} ${tasksLeft > 1 ? 'items' : 'item'}`}</span>
        <TasksFilter clearTasks={clearTasks} allList={allList} activeList={activeList} completedList={completedList} />
        <button className="clear-completed" onClick={() => clearTasks()}>
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.defaultProps = {
  tasksLeft: '0 item'
};

Footer.propTypes = {
  clearTasks: PropTypes.func,
  allList: PropTypes.func,
  activeList: PropTypes.func,
  completedList: PropTypes.func,
  tasksLeft: PropTypes.number
};

export default Footer;
import { PureComponent } from 'react';
import PropTypes from 'prop-types';

class TasksFilter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      elementName: [
        { className: 'all selected', select: true },
        { className: 'active', select: false },
        { className: 'complete', select: false }
      ]
    };
  }

  selectedFooterItem = (e) => {
    let el = e.target.closest('button');
    if (!el) return;
    const selectElement = this.state.elementName.map((item) =>
      item.className === el.className
        ? { className: (el.className += ' selected'), select: true }
        : { className: item.className.replace(' selected', ''), select: false }
    );
    this.setState({
      elementName: selectElement
    });
  };

  render() {
    const { allList, activeList, completedList } = this.props;
    return (
      <ul className="filters" onClick={this.selectedFooterItem}>
        <li>
          <button className={this.state.elementName[0].className} onClick={() => allList()}>
            All
          </button>
        </li>
        <li>
          <button className={this.state.elementName[1].className} onClick={() => activeList()}>
            Active
          </button>
        </li>
        <li>
          <button className={this.state.elementName[2].className} onClick={() => completedList()}>
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

TasksFilter.propTypes = {
  allList: PropTypes.func,
  activeList: PropTypes.func,
  completedList: PropTypes.func
};

export default TasksFilter;
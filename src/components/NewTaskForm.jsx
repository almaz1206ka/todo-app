import { PureComponent } from 'react';
import PropTypes from 'prop-types';

class NewTaskForm extends PureComponent {
  render() {
    const { handleChange, handleSubmit } = this.props;
    return (
      <header className="header" onKeyUp={(event) => handleSubmit(event)}>
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onInput={(event) => handleChange(event)}
        />
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func
};

export default NewTaskForm;

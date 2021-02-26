import React, {Component} from 'react';

import './todo-list-item.css';

const TodoListItem = ({ label, onDeleted, onToggleImportant, onToggleDone, done, important }) => {


    let classNames = 'todo-list-item'
    if (done) {
      classNames += ' done'
    }

    if (important) {
      classNames += ' important'
    }

    return (
      <span className={classNames}>
        <span
          className="todo-list-item-label"
          onClick={onToggleDone}
          >
          {label}
        </span>

        <button type="button"
                className="btn btn-outline-success btn-sm"
                onClick={onToggleImportant}
                >
          IMPORTANT
        </button>

        <button type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={onDeleted}>
          DELETE
        </button>
      </span>
    )

}





export default TodoListItem
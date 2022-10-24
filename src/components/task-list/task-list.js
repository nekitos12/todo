import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './task-list.css'
import Task from '../task'

const classNames = require('classnames')

export default class TaskList extends Component {
  state = {
    currentTask: '',
  }

  onTaskEdit = (todo) => (e) => {
    this.setState(() => {
      return {
        currentTask: e.target.value,
      }
    })
    this.props.changeTaskDescr(e.target.value, todo.id)
  }

  onSubmitChange = (todo) => (e) => {
    e.preventDefault()
    this.setState(() => {
      return {
        currentTask: '',
      }
    })
    this.props.onToggleEdit(todo.id)
  }

  render() {
    const { todos, onDeleted, onToggleDone, onToggleEdit, onPlayClick, onPauseClick, setTime } = this.props

    const elements = todos.map((todo) => {
      const { isDone, isEditing } = todo

      const className = classNames({
        completed: isDone,
        editing: isEditing,
      })
      return (
        <li key={todo.id} className={className}>
          <Task
            {...todo}
            onDeleted={() => onDeleted(todo.id)}
            onToggleDone={() => onToggleDone(todo.id)}
            onToggleEdit={() => onToggleEdit(todo.id)}
            onPlayClick={onPlayClick}
            onPauseClick={onPauseClick}
            setTime={setTime}
          />
          {isEditing ? (
            <input
              type="text"
              className="edit"
              value={this.state.currentTask || todo.label}
              onChange={this.onTaskEdit(todo)}
              onBlur={this.onSubmitChange(todo)}
            />
          ) : null}
        </li>
      )
    })
    return <ul className="todo-list">{elements}</ul>
  }
}
TaskList.defaultProps = {
  todos: [],
}
TaskList.propTypes = {
  changeTaskDescr: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      isDone: PropTypes.bool,
      isEditing: PropTypes.bool,
      id: PropTypes.number,
      currentBornTime: PropTypes.string,
      createdAt: PropTypes.number,
      timetoComplete: PropTypes.number,
      isPause: PropTypes.bool,
    })
  ),
  onPlayClick: PropTypes.func.isRequired,
  onPauseClick: PropTypes.func.isRequired,
}

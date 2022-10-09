import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './task-list.css'
import Task from '../task'

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
    const { todos, onDeleted, onToggleDone, onToggleEdit } = this.props

    const elements = todos.map((todo) => {
      const { isDone, isEditing } = todo
      let classNames = ''
      if (isDone) classNames += ' completed'
      if (isEditing) classNames += ' editing'
      return (
        <li key={todo.id} className={classNames}>
          <Task
            {...todo}
            onDeleted={() => onDeleted(todo.id)}
            onToggleDone={() => onToggleDone(todo.id)}
            onToggleEdit={() => onToggleEdit(todo.id)}
            taskDone={todo.isDone}
          />
          {isEditing ? (
            <form action="" onSubmit={this.onSubmitChange(todo)}>
              <input
                type="text"
                className="edit"
                value={this.state.currentTask || todo.label}
                onChange={this.onTaskEdit(todo)}
              />
            </form>
          ) : null}
        </li>
      )
    })
    return <ul className="todo-list">{elements}</ul>
  }
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
    })
  ).isRequired,
}

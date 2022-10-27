import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './task-list.css'
import Task from '../task'

const classNames = require('classnames')

function TaskList({
  todos,
  onDeleted,
  useInterval,
  onToggleDone,
  onToggleEdit,
  onPlayClick,
  onPauseClick,
  changeTaskDescr,
  setTime,
}) {
  const [currentTask, setCurrentTask] = useState('')

  const onTaskEdit = (todo) => (e) => {
    setCurrentTask(e.target.value)
    changeTaskDescr(e.target.value, todo.id)
  }

  const onSubmitChange = (todo) => (e) => {
    e.preventDefault()
    setCurrentTask('')
    onToggleEdit(todo.id)
  }

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
          useInterval={useInterval}
        />
        {isEditing ? (
          <input
            type="text"
            className="edit"
            value={currentTask || todo.label}
            onChange={onTaskEdit(todo)}
            onBlur={onSubmitChange(todo)}
          />
        ) : null}
      </li>
    )
  })
  return <ul className="todo-list">{elements}</ul>
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
      id: PropTypes.string,
      currentBornTime: PropTypes.string,
      createdAt: PropTypes.number,
      timetoComplete: PropTypes.number,
      isPause: PropTypes.bool,
    })
  ),
  onPlayClick: PropTypes.func.isRequired,
  onPauseClick: PropTypes.func.isRequired,
}

export default TaskList

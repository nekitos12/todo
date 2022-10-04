import React from 'react'
import PropTypes from 'prop-types'
import './task.css'

function Task({ label, currentBornTime, taskDone, onToggleDone, onDeleted, onToggleEdit }) {
  return (
    <div className="view">
      <input className="toggle" onClick={onToggleDone} type="checkbox" defaultChecked={taskDone} />
      <label>
        <span className="description">{label}</span>
        <span className="created"> created {currentBornTime}</span>
      </label>
      <button aria-label="Edit task" className="icon icon-edit" onClick={onToggleEdit} />
      <button aria-label="Delete task" className="icon icon-destroy" onClick={onDeleted} />
    </div>
  )
}

Task.defaultProps = {
  currentBornTime: 'less than 2 seconds',
  taskDone: false,
}
Task.propTypes = {
  currentBornTime: PropTypes.string,
  label: PropTypes.string.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  taskDone: PropTypes.bool,
}

export default Task

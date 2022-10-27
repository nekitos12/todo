import React from 'react'
import PropTypes from 'prop-types'
import './task.css'

function Task({
  id,
  label,
  currentBornTime,
  timetoComplete,
  isDone,
  onToggleDone,
  onDeleted,
  onToggleEdit,
  onPlayClick,
  onPauseClick,
  useInterval,
  isPause,
  setTime,
}) {
  if (timetoComplete) {
    if (!isPause) {
      useInterval(() => setTime(id), 1000)
    } else {
      useInterval(() => setTime(id), null)
    }
  }

  const revertTimetoString = (time) => {
    return !isNaN(time) ? `${Math.floor(time / 60)}:${time - Math.floor(time / 60) * 60}` : ''
  }

  const timeToDone = revertTimetoString(timetoComplete)
  return (
    <div className="view">
      <input className="toggle" onClick={onToggleDone} type="checkbox" defaultChecked={isDone} />
      <div className="create">
        <span className="title">{label}</span>
        <div className="description">
          <button aria-label="icon-play" className="icon icon-play" onClick={() => onPlayClick(id)} />
          <button aria-label="icon-pause" className="icon icon-pause" onClick={() => onPauseClick(id)} />
          {timeToDone}
        </div>
        <span className="description"> created {currentBornTime}</span>
      </div>
      <button aria-label="Edit task" className="icon icon-edit" onClick={onToggleEdit} />
      <button aria-label="Delete task" className="icon icon-destroy" onClick={onDeleted} />
    </div>
  )
}

Task.defaultProps = {
  currentBornTime: 'less than 2 seconds',
  isDone: false,
  timetoComplete: 0,
  isPause: false,
}
Task.propTypes = {
  currentBornTime: PropTypes.string,
  isDone: PropTypes.bool,
  isPause: PropTypes.bool,
  timetoComplete: PropTypes.number,
}

export default Task

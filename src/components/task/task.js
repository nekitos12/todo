import React from 'react'
import PropTypes from 'prop-types'
import './task.css'

export default class Task extends React.Component {
  componentDidMount() {
    this.props.setTime(this.props.id, 1)
    this.interval = setInterval(this.setTime, 1000)
  }

  componentDidUpdate() {
    this.interval = this.interval || setInterval(this.setTime, 1000)
    if (this.props.isPause || this.props.timetoComplete === 0) {
      clearInterval(this.interval)
      delete this.interval
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  setTime = () => {
    this.props.setTime(this.props.id)
  }

  revertTimetoString = (time) => {
    return !isNaN(time) ? `${Math.floor(time / 60)}:${time - Math.floor(time / 60) * 60}` : ''
  }

  render() {
    const {
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
    } = this.props

    const timeToDone = this.revertTimetoString(timetoComplete)
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
}

Task.defaultProps = {
  currentBornTime: 'less than 2 seconds',
  isDone: false,
  timetoComplete: 0,
  isPause: false,
}
Task.propTypes = {
  currentBornTime: PropTypes.string,
  label: PropTypes.string.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  isDone: PropTypes.bool,
  id: PropTypes.number.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  onPauseClick: PropTypes.func.isRequired,
  isPause: PropTypes.bool,
  timetoComplete: PropTypes.number,
}

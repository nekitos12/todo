import React from 'react'
import PropTypes from 'prop-types'
import './task.css'

export default class Task extends React.Component {
  state = {}

  componentDidMount() {
    this.interval = setInterval(this.setTime, 1000)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isPause !== this.props.isPause) {
      if (this.props.isPause) {
        clearInterval(this.interval)
      } else {
        this.interval = setInterval(this.setTime, 1000)
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  setTime = () => {
    this.setState(({ time }) => {
      return {
        time: time ? time - 1 : this.props.timetoComplete,
      }
    })
  }

  // eslint-disable-next-line class-methods-use-this
  revertTimetoString = (time) => {
    // eslint-disable-next-line no-restricted-globals
    return !isNaN(time) ? `${Math.floor(time / 60)}:${time - Math.floor(time / 60) * 60}` : ''
  }

  render() {
    const { id, label, currentBornTime, isDone, onToggleDone, onDeleted, onToggleEdit, onPlayClick, onPauseClick } =
      this.props

    const timeToDone = this.revertTimetoString(this.state.time)
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

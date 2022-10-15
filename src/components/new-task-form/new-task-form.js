import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default class NewTaskForm extends Component {
  state = {
    input: '',
    minute: 0,
    seconds: 0,
  }

  onNewFormChange = (e) => {
    this.setState(() => {
      return {
        input: e.target.value,
      }
    })
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    const { input, minute, seconds } = this.state
    const { onFormSubmit } = this.props
    if (!(input && minute && seconds)) return
    const time = minute * 60 + seconds
    onFormSubmit(input, time)
    this.setState(() => {
      return {
        input: '',
        minute: 0,
        seconds: 0,
      }
    })
  }

  timeChange = (time) => (e) => {
    this.setState(() => {
      return {
        [time]: Number(e.target.value),
      }
    })
  }

  render() {
    const { input, minute, seconds } = this.state

    return (
      <form action="#" className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onNewFormChange}
          type="text"
          value={input}
          onBlur={this.onFormSubmit}
        />
        <input
          className="new-todo-form__timer"
          type="text"
          placeholder="Min"
          onChange={this.timeChange('minute')}
          value={minute || ''}
          onBlur={this.onFormSubmit}
        />
        <input
          className="new-todo-form__timer"
          type="text"
          placeholder="Sec"
          onChange={this.timeChange('seconds')}
          value={seconds || ''}
          onBlur={this.onFormSubmit}
        />
      </form>
    )
  }
}
NewTaskForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
}

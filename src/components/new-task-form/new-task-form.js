import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default function NewTaskForm({ addItem }) {
  const [input, setInput] = useState('')
  const [time, setTime] = useState({
    minute: 0,
    seconds: 0,
  })
  const { minute, seconds } = time

  const onNewFormChange = (e) => {
    setInput(() => e.target.value)
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
    if (!(input && minute && seconds)) return
    const deadline = minute * 60 + seconds
    addItem(input, deadline)
    setInput('')
    setTime({
      minute: 0,
      seconds: 0,
    })
  }

  const timeChange = (newTime) => (e) => {
    setTime((prev) => {
      return {
        ...prev,
        [newTime]: Number(e.target.value),
      }
    })
  }

  return (
    <form action="#" className="new-todo-form">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={onNewFormChange}
        type="text"
        value={input}
        onBlur={onFormSubmit}
      />
      <input
        className="new-todo-form__timer"
        type="text"
        placeholder="Min"
        onChange={timeChange('minute')}
        value={minute || ''}
        onBlur={onFormSubmit}
      />
      <input
        className="new-todo-form__timer"
        type="text"
        placeholder="Sec"
        onChange={timeChange('seconds')}
        value={seconds || ''}
        onBlur={onFormSubmit}
      />
    </form>
  )
}
NewTaskForm.propTypes = {
  addItem: PropTypes.func.isRequired,
}

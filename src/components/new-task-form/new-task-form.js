import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
    }
  }

  onNewFormChange = (e) => {
    this.setState({
      input: e.target.value,
    })
  }

  onFormSubmit = (e) => {
    e.preventDefault()

    const { input } = this.state
    const { onFormSubmit } = this.props

    if (input === '') return
    onFormSubmit(input)
    this.setState({
      input: '',
    })
  }

  render() {
    const { input } = this.state

    return (
      <form action="#" onSubmit={this.onFormSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onNewFormChange}
          value={input}
        />
      </form>
    )
  }
}
NewTaskForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
}

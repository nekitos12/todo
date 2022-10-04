import React from 'react'
import PropTypes from 'prop-types'

import './footer.css'
import TasksFilter from '../tasks-filter'

function Footer({ todoCount, onFilterClick, clearCompleted, currentFilter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TasksFilter currentFilter={currentFilter} onFilterClick={onFilterClick} />
      <button aria-label="Clear completed" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}
Footer.defaultProps = {
  todoCount: 'N',
  currentFilter: 'All',
}
Footer.propTypes = {
  todoCount: PropTypes.number,
  currentFilter: PropTypes.string,
}

export default Footer

import React from 'react'
import PropTypes from 'prop-types'
import './tasks-filter.css'

function TasksFilter({ currentFilter, onFilterClick }) {
  const filterData = ['All', 'Active', 'Completed']
  const arr = filterData.map((filter) => {
    return (
      <li key={filter}>
        <label className={currentFilter === filter ? 'selected' : null}>
          <input type="radio" name="filter" value={filter} onClick={() => onFilterClick(filter)} />
          {filter}
        </label>
      </li>
    )
  })
  return <ul className="filters">{arr}</ul>
}
TasksFilter.defaultProps = {
  currentFilter: 'All',
}
TasksFilter.propTypes = {
  onFilterClick: PropTypes.func.isRequired,
  currentFilter: PropTypes.string,
}

export default TasksFilter

import React from 'react'
import PropTypes from 'prop-types'
import './tasks-filter.css'

function TasksFilter({ currentFilter, onFilterClick }) {
  const filterData = [
    {
      filter: 'All',
      id: 1,
    },
    {
      filter: 'Active',
      id: 2,
    },
    {
      filter: 'Completed',
      id: 3,
    },
  ]
  const arr = filterData.map(({ filter, id }) => {
    return (
      <li key={id}>
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

import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { formatDistanceToNow } from 'date-fns'
import nextId from 'react-id-generator'

import './style.css'
import NewTaskForm from './components/new-task-form'
import TaskList from './components/task-list'
import Footer from './components/footer'

function TodoApp() {
  const [filter, setFilter] = useState('All')
  function createTodoItem(label, time) {
    return {
      label,
      isDone: false,
      isEditing: false,
      id: nextId(),
      timetoComplete: time,
      createdAt: Date.now(),
      isPause: false,
    }
  }

  const [todoData, setTodoData] = useState(() => [
    createTodoItem('Drink Coffee', 20),
    createTodoItem('Learn react', 25),
    createTodoItem('Make a dinner', 30),
  ])

  const copyArray = (arr) => JSON.parse(JSON.stringify(arr))

  const upDate = () => {
    setTodoData((todos) => {
      return copyArray(todos).map((todo) => ({
        ...todo,
        currentBornTime: formatDistanceToNow(todo.createdAt, { includeSeconds: true }),
      }))
    })
  }

  function useInterval(callback, delay) {
    useEffect(() => {
      function tick() {
        callback()
      }
      if (delay !== null) {
        // eslint-disable-next-line no-shadow
        const id = setInterval(tick, delay)
        return () => clearInterval(id)
      }
    }, [delay])
  }

  useInterval(() => {
    upDate()
  }, 2000)

  const addItem = (label, time) => {
    const newItem = createTodoItem(label, time)
    setTodoData((todos) => [newItem, ...todos])
  }

  const deleteItem = (id) => {
    setTodoData((todos) => todos.filter((el) => el.id !== id))
  }

  const toggleProperty = (id, propName, arr = todoData) => {
    return copyArray(arr).map((todo) => {
      return todo.id === id || todo.isEditing ? { ...todo, [propName]: !todo[propName] } : { ...todo }
    })
  }

  const onToggleDone = (id) => {
    setTodoData((todos) => toggleProperty(id, 'isDone', todos))
  }

  const onToggleEdit = (id) => {
    setTodoData((todos) => toggleProperty(id, 'isEditing', todos))
  }

  const changeTaskDescr = (newLabel, id) => {
    setTodoData((todos) => {
      return copyArray(todos).map((todo) => (todo.id === id ? { ...todo, label: newLabel } : { ...todo }))
    })
  }

  const onFilterClick = (newFilter) => {
    setFilter(newFilter)
  }

  const clearCompleted = () => {
    setTodoData((todos) => {
      return copyArray(todos).filter((todo) => !todo.isDone)
    })
  }

  const filteredTodo = () => {
    switch (filter) {
      case 'All':
        return todoData
      case 'Active':
        return todoData.filter((todo) => !todo.isDone)
      case 'Completed':
        return todoData.filter((todo) => todo.isDone)
      default:
        return todoData
    }
  }

  const onPlayClick = (id) => {
    setTodoData((todos) => {
      return copyArray(todos).map((todo) => (todo.id === id ? { ...todo, isPause: false } : { ...todo }))
    })
  }

  const onPauseClick = (id) => {
    setTodoData((todos) => {
      return copyArray(todos).map((todo) => (todo.id === id ? { ...todo, isPause: true } : { ...todo }))
    })
  }

  const setTime = (id) => {
    setTodoData((todos) => {
      return copyArray(todos).map((todo) =>
        todo.id === id
          ? { ...todo, timetoComplete: todo.timetoComplete > 0 ? todo.timetoComplete - 1 : 0 }
          : { ...todo }
      )
    })
  }

  const todoCount = todoData.filter((todo) => !todo.isDone).length
  const filterData = filteredTodo() || []
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addItem={addItem} />
      </header>
      <section className="main">
        <TaskList
          todos={filterData}
          onDeleted={deleteItem}
          onToggleEdit={onToggleEdit}
          onToggleDone={onToggleDone}
          changeTaskDescr={changeTaskDescr}
          onPlayClick={onPlayClick}
          onPauseClick={onPauseClick}
          setTime={setTime}
          useInterval={useInterval}
        />
        <Footer
          onFilterClick={onFilterClick}
          currentFilter={filter}
          todoCount={todoCount}
          clearCompleted={clearCompleted}
        />
      </section>
    </section>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <TodoApp />
  </React.StrictMode>
)

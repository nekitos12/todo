import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import { formatDistanceToNow } from 'date-fns'

import './style.css'
import NewTaskForm from './components/new-task-form'
import TaskList from './components/task-list'
import Footer from './components/footer'

export default class TodoApp extends Component {
  maxId = 100

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Learn React'),
      this.createTodoItem('Have a dinner'),
    ],
    filter: 'All',
  }

  filters = {
    All: () => {
      return this.state.todoData
    },
    Active: () => {
      return this.state.todoData.filter((todo) => !todo.done)
    },
    Completed: () => {
      return this.state.todoData.filter((todo) => todo.done)
    },
  }

  upDate = () => {
    this.setState(({ todoData }) => {
      const newTodos = JSON.parse(JSON.stringify(todoData))
      return {
        todoData: newTodos.map((todo) => ({
          ...todo,
          currentBornTime: formatDistanceToNow(todo.realBornTime, { includeSeconds: true }),
        })),
      }
    })
  }

  addItem = (label) => {
    const newItem = this.createTodoItem(label)

    this.setState(({ todoData }) => {
      return {
        todoData: [newItem, ...todoData],
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.filter((el) => el.id !== id),
      }
    })
  }

  toggleProperty = (arr, id, propName) => {
    const newArray = JSON.parse(JSON.stringify(arr))
    return newArray.map((todo) => {
      return todo.id === id || todo.editing ? { ...todo, [propName]: !todo[propName] } : { ...todo }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
      }
    })
  }

  onToggleEdit = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'editing'),
      }
    })
  }

  changeTaskDescr = (newLabel, id) => {
    this.setState(({ todoData }) => {
      const newTodos = JSON.parse(JSON.stringify(todoData))
      return {
        todoData: newTodos.map((todo) => (todo.id === id ? { ...todo, label: newLabel } : { ...todo })),
      }
    })
  }

  onFilterClick = (filter) => {
    this.setState(() => {
      return {
        filter,
      }
    })
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const newTodos = JSON.parse(JSON.stringify(todoData))
      return {
        todoData: newTodos.filter((todo) => !todo.done),
      }
    })
  }

  createTodoItem(label) {
    return {
      label,
      done: false,
      editing: false,
      id: this.maxId++,
      realBornTime: Date.now(),
    }
  }

  render() {
    const todoCount = this.state.todoData.filter((todo) => !todo.done).length
    setTimeout(() => this.upDate(), 2000)
    const filterData = this.filters[this.state.filter]()
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onFormSubmit={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todos={filterData}
            onDeleted={this.deleteItem}
            onToggleEdit={this.onToggleEdit}
            onToggleDone={this.onToggleDone}
            changeTaskDescr={this.changeTaskDescr}
          />
          <Footer
            onFilterClick={this.onFilterClick}
            currentFilter={this.state.filter}
            todoCount={todoCount}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <TodoApp />
  </React.StrictMode>
)

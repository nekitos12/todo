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

  upDate = () => {
    this.setState(({ todoData }) => {
      const newTodos = JSON.parse(JSON.stringify(todoData))
      return {
        todoData: newTodos.map((todo) => ({
          ...todo,
          currentBornTime: formatDistanceToNow(todo.createdAt, { includeSeconds: true }),
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

  toggleProperty = (id, propName, arr = this.state.todoData) => {
    const newArray = JSON.parse(JSON.stringify(arr))
    return newArray.map((todo) => {
      return todo.id === id || todo.isEditing ? { ...todo, [propName]: !todo[propName] } : { ...todo }
    })
  }

  onToggleDone = (id) => {
    this.setState(() => {
      return {
        todoData: this.toggleProperty(id, 'isDone'),
      }
    })
  }

  onToggleEdit = (id) => {
    this.setState(() => {
      return {
        todoData: this.toggleProperty(id, 'isEditing'),
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
        todoData: newTodos.filter((todo) => !todo.isDone),
      }
    })
  }

  filteredTodo = () => {
    const { filter, todoData } = this.state
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

  createTodoItem(label) {
    return {
      label,
      isDone: false,
      isEditing: false,
      id: this.maxId++,
      createdAt: Date.now(),
    }
  }

  render() {
    const todoCount = this.state.todoData.filter((todo) => !todo.isDone).length
    setTimeout(() => this.upDate(), 2000)
    const filterData = this.filteredTodo()
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

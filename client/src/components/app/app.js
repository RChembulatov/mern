import React, { Component } from "react";

import TodoList from '../todo-list/todo-list'
import SearchPanel from '../search-panel/search-panel'
import AppHeader from '../app-header/app-header'
import ItemStatusFilter from '../item-status-filter/item-status-filter'
import ItemAddForm from "../item-add-form/item-add-form";

import './app.css'

export default class App extends Component  {

  maxId = 100

  state = {
    todoData: [],
    term: '',
    filter: 'all'
  }

  componentDidMount() {
    fetch('/api/todo', {
      method: 'get'
    })
    .then(res => res.json())
    .then(data => {
      const todoData = []

      data.forEach(element => {
        todoData.push({
          id: element._id,
          label: element.label,
          done: element.done,
          important: element.important,
          date: element.date
        })
      });

    this.setState({todoData})
    })
    .catch(e => console.log(e))
  }

  deleteItem = (id) => {

    fetch('/api/todo/' + id, {
      method: 'delete',
      body: JSON.stringify({ id })
    })
    .then(() => {
      this.setState(({todoData}) => {
        const idx = todoData.findIndex(i => i.id === id)

        const item = todoData[idx]
        const newArr = todoData.filter(i => i.id !== item.id)
        return {
          todoData: newArr
        }

      })
    })
    .catch(e => console.log(e))



  }

  addItem = (label) => {
    fetch("/api/todo", {
      method: "post",
      headers: {
      "Content-Type": "application/json",
    },
      body: JSON.stringify({ label }),
    })
    .then((res) => res.json())
    .then((todo) => {
      this.setState(({todoData}) => {
        const item = { id: todo._id, label: todo.label, done: todo.done, important: todo.important, date: todo.date }
        const newArr = [...todoData, item]
        return {
          todoData: newArr
        }
      })

    })
    .catch((e) => console.log(e));
  }

  toggleProperty (array, prop, id) {
      const idx = array.findIndex(i => i.id === id)
      const item = array[idx]
      const newItem = {...item, [prop]: !item[prop]}
      return [
        ...array.slice(0, idx),
        newItem,
        ...array.slice(idx + 1)
      ]
  }

  onToggleImportant = (id) => {

    fetch("/api/todo/important/" + id, {
      method: "put",
      headers: {
      "Content-Type": "application/json",
    },
      body: JSON.stringify({ id }),
    })
    .then((res) => res.json())
    .then((todo) => {
      this.setState(({todoData}) => {
        return {
          todoData: this.toggleProperty(todoData, 'important', id)
        }
      })

    })
    .catch((e) => console.log(e));
  }

  onToggleDone = (id) => {
    // this.setState(({todoData}) => {
    //   return {
    //     todoData: this.toggleProperty(todoData, 'done', id)
    //   }
    // })

    fetch("/api/todo/done/" + id, {
      method: "put",
      headers: {
      "Content-Type": "application/json",
    },
      body: JSON.stringify({ id }),
    })
    .then((res) => res.json())
    .then((todo) => {
      this.setState(({todoData}) => {
        return {
          todoData: this.toggleProperty(todoData, 'done', id)
        }
      })

    })
    .catch((e) => console.log(e));


  }

  searchFilter(items, term) {
    if (term.length === 0) {
      return items
    }
    return items.filter(item => {
      return item.label
        .toLowerCase()
        .indexOf(term.toLowerCase()) > -1
    })
  }

  onSearchChange = (term) => {
    this.setState({term})
  }

  filterButtnon(items, filter) {
    switch (filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => !item.done)
      case 'done':
        return items.filter((item) => item.done)
      default:
        return items;
    }
  }

  onFilterChange = (filter) => {
    this.setState({filter})
  }

  render() {
    const {todoData, filter, term} = this.state

    const visibleItems = this.filterButtnon(
      this.searchFilter(todoData, term), filter)
    const doneCount = todoData.filter(el => el.done === true).length

    const todoCount = todoData.length - doneCount

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel  onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}/>
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={ this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
          />
          <ItemAddForm onAddItem={this.addItem}/>
      </div>
    );
  }
}

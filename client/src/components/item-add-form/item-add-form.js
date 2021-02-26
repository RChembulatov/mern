import React, {Component, Componet} from 'react'

import './item-add-form.css'

export default class ItemAddForm extends Component {

  state = {
    label: ''
  }

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.onAddItem(this.state.label)
    this.setState({
      label: ''
    })
  }

  render() {

   return (
    <form className="item-add-form d-flex"
          onSubmit={this.onSubmit}
    >
      <input type="text" className="form-control" name="title" onChange={this.onLabelChange} placeholder="What needs to be done?" value={this.state.label}/>
        <button type="submit"
          className="btn btn-outline-dark"
        >
            Add task
        </button>
    </form>
  )
  }

}


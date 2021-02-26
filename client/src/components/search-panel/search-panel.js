import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component{
  state = {
    term: ''
  }

  searchPanel = (event) => {
    const term = event.target.value
    console.log(term)
    this.setState({term})
    this.props.onSearchChange(term)
  }

  render() {
    return (
        <input type="text"
                  className="form-control search-input"
                  placeholder="type to search"
                  onChange={this.searchPanel}
                  value={this.state.term}
                  />
      )
  }
}

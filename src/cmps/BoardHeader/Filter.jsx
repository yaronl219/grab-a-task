import React, { Component } from 'react'

export class Filter extends Component {

    state = {
        search: null
    }

    handleChange = async ({ target }) => {
        // will be added by label and by user
        await this.setState({ search: { txt: target.value } })
        this.props.onFilter(this.state.search)
    }

    render() {        
        return (
            <div className="search-filter-container">
                <input type="search" id="search" autoCorrect="off"
                className="search-bar"
                onChange={ this.handleChange }
                />
            </div>
        )
    }
}

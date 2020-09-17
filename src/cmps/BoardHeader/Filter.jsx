import React, { Component } from 'react'
import { FilterByLabel } from './FilterByLabel'

export class Filter extends Component {

    state = {
        isLabelModalShown: false
    }

    handleChange = async ({ target }) => {
        await this.setState({ search: { txt: target.value } })

        // send action
        this.props.onFilter(this.state.search)
    }

    handleLabel = async () => {

    }

    toggleModal = () => {
        this.setState({ isLabelModalShown: !this.state.isLabelModalShown })
    }

    render() {
        return (
            <React.Fragment>
                <div className="search-filter-container">
                    <input type="search" id="search" autoCorrect="off" autoComplete="off"
                        className="search-bar"
                        onChange={this.handleChange} />
                    <button onClick={this.toggleModal}>Labels</button>
                    {this.state.isLabelModalShown && 
                    <FilterByLabel toggleModal={this.toggleModal} 
                    />}
                </div>
            </React.Fragment>
        )
    }
}
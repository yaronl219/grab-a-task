import React, { Component } from 'react'
import { FilterByLabel } from './FilterByLabel'


export class Filter extends Component {

    state = {
        isLabelModalShown: false
    }

    handleChange = async ({ target }) => {
        // fix this
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
                    <div className="input-container">
                        <input type="search" id="search" autoCorrect="off" autoComplete="off"
                            className="search-bar"
                            onChange={this.handleChange} />

                        <div className="search-icon-container"><span className="material-icons">search</span></div>

                    </div>

                    <div className="board-header-btn filter-btn" onClick={this.toggleModal} ><span className="material-icons">sort</span></div>
                    {this.state.isLabelModalShown && 
                    <FilterByLabel toggleModal={this.toggleModal} 
                    />}
                </div>
            </React.Fragment>
        )
     }

}



import { Popover } from '@material-ui/core'
import React, { Component } from 'react'
import { FilterByLabel } from './FilterByLabel'


export class Filter extends Component {

    state = {
        isLabelModalShown: false
    }

    ref = React.createRef()
    handleChange = async ({ target }) => {
        // fix this
        await this.setState({ search: { txt: target.value } })
        // send action
        this.props.onFilter(this.state.search)
    }

    handleLabel = async () => {

    }

    openModal = () => {
        this.setState({ isLabelModalShown:true })
    }

    closeModal = () => {
        
        this.setState({isLabelModalShown:false})
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

                    <div className="board-header-btn filter-btn" ref={this.ref} onClick={this.openModal} ><span className="material-icons">sort</span></div>
                    {/* {this.state.isLabelModalShown &&
                        <FilterByLabel toggleModal={this.toggleModal}
                        />} */}
                                        <Popover
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={this.state.isLabelModalShown}
                    anchorEl={this.ref.current}
                    onClose={this.closeModal}
                    onBackdropClick={this.closeModal}
                >
                    <FilterByLabel onClose={this.closeModal} toggleModal={this.closeModal} />
                </Popover>
                </div>
            </React.Fragment>
        )
    }

}



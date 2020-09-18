import React, { Component } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { onAddNewGroup } from '../../../store/actions/boardActions';

export class _AddNewGroup extends Component {

    state = {
        newGroupTitle: ''
    }

    componentDidMount() {
        this.setState({ newGroupTitle: '' })
    }
    

    handleChange = (event) => {
        const title = event.target.value        
        this.setState({ newGroupTitle: title })
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        if (!this.state.newGroupTitle) return
        this.props.onAddNewGroup(this.props.board ,this.state.newGroupTitle)
        this.setState({ newGroupTitle: '' })
    }

    render() {
        // if(!this.state.isShown) return <div></div>
        return (
                <div className="new-group-form">
                    <form onBlur={this.setNotEditing} onSubmit={this.onSubmit} >
                    <input onBlur={() => this.props.closeNewGroup()} 
                    placeholder="Enter list title" 
                    type="text" autoFocus onChange={this.handleChange} 
                        value={this.state.newGroupTitle ? this.state.newGroupTitle : ''}
                    />
                        <div className="save-btn-container">
                            <button className="save-btn" onMouseDown={this.onSubmit}>Add List</button>
                        <CloseIcon onClick={ ()=> this.props.closeNewGroup() } />
                        </div>

                    </form>
                </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardReducer.board
    };
};

const mapDispatchToProps = {
    onAddNewGroup
};

export const AddNewGroup = connect(mapStateToProps, mapDispatchToProps)(_AddNewGroup);
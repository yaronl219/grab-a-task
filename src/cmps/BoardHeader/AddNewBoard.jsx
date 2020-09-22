

import React, { Component } from 'react'
import { NewBoardColor } from './NewBoardColor'
import { connect } from 'react-redux';
import { allBoardColors } from '../../assets/bgColors/bgColors';
import { addNewBoard } from '../../store/actions/boardActions';
import { ClickAwayListener } from '@material-ui/core';

export class _AddNewBoard extends Component {

    state = {
        selectedColor: null,
        newBoardName: ''
    }

    componentDidMount() {
        this.setState({  selectedColor: null, newBoardName: '' })
    }
    

    onSetColor=(color)=>{
        this.setState({ selectedColor: color })
    }

    isSelected(color){
        if(this.state.selectedColor === color) return true
        else return false
    }

    handleChange=(ev)=>{
        this.setState({ newBoardName: ev.target.value })
    }

    onSubmit=(ev)=>{
        ev.preventDefault()
        const boardColor = this.state.selectedColor
        const boardName = this.state.newBoardName
        this.props.addNewBoard(boardName, boardColor)
    }

    render() {    
        
        return (
            <ClickAwayListener onClickAway={this.props.onCloseModal}>
            <div className="add-board-container">
                {/* <button onClick={ this.props.onCloseModal }>x</button> */}
                <h3>New board</h3>
                <input onChange={this.handleChange} type="text" placeholder="New Board's Name" autoFocus />
                <div className="new-board-colors-container">
                    {
                        allBoardColors.map(boardColor => {
                            return <NewBoardColor 
                                color={boardColor.color}
                                key={boardColor.id}
                                onSetColor={this.onSetColor}
                                isSelected={this.isSelected(boardColor.color)}
                            />
                        })
                    }
                </div>
                <button onClick={  this.onSubmit  }>Add New Board</button>
            </div>
            </ClickAwayListener>
        )
    }
}
// colors are now imported from another file
// need to remove this line and only bring the board
const mapStateToProps = state => {
    return {
        boardColors: state.boardReducer.board.boardColors,
    };
};

const mapDispatchToProps = {
        addNewBoard
}

export const AddNewBoard = connect(mapStateToProps, mapDispatchToProps)(_AddNewBoard)
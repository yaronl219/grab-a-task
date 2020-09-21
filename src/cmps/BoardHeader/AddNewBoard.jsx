

import React, { Component } from 'react'
import { NewBoardColor } from './NewBoardColor'
import { connect } from 'react-redux';
import { allBoardColors } from '../../assets/bgColors/bgColors';
export class _AddNewBoard extends Component {

    state = {
        selectedColor: null
    }

    onSetColor=(color)=>{
        this.setState({ selectedColor: color })
    }

    isSelected(color){
        if(this.state.selectedColor === color) return true
        else return false
    }

    onSubmit=()=>{
        console.log('yes');
        
    }

    render() {    
        console.log(allBoardColors)
        
        return (
            <div className="add-board-container">
                <button onClick={ this.props.onCloseModal }>x</button>
                <h3>New board</h3>
                <input type="text" placeholder="New Board's Name" autoFocus/>
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
                <button onSubmit={ this.onSubmit }>Add New Board</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        boardColors: state.boardReducer.board.boardColors,
    };
};

export const AddNewBoard = connect(mapStateToProps)(_AddNewBoard)
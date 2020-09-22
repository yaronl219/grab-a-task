import React, { Component } from 'react'
import { ClickAwayListener } from '@material-ui/core';
import { connect } from 'react-redux';
import { onArchiveGroup, onArchiveAllCards } from '../../store/actions/boardActions';

export class _GroupMenu extends Component {

    addCard=(ev)=>{
        // currently adding without moving to focus to new card
        // need to focus on "NewItem" and set its state with the help of parent element (same parent)
        ev.stopPropagation()
        this.props.onAdd('New Card')
    }

    archiveAllCards = (ev)=>{     
        ev.stopPropagation()
        this.props.onArchiveAllCards(this.props.groupId, this.props.board)
        this.props.toggleMenu()
    }

    archiveGroup=(ev)=>{
        ev.stopPropagation()
        this.props.onArchiveGroup(this.props.groupId, this.props.board)
        this.props.toggleMenu()
    }

    render() {
        return (
            <ClickAwayListener onClickAway={()=> this.props.toggleMenu()}>
                <div className="group-menu-container">
                        <div>List Actions</div> 
                        <div><hr /></div>
                        <div onClick={ this.addCard } className="group-menu-item">Add Card...</div>
                    <div onClick={this.archiveAllCards} className="group-menu-item">Archive All Cards...</div>
                        <div><hr/></div>
                        <div onClick={ this.archiveGroup } className="group-menu-item">Archive This Group...</div>
                </div>
            </ClickAwayListener>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardReducer.board
    };
};
const mapDispatchToProps = {
    onArchiveGroup,
    onArchiveAllCards
};

export const GroupMenu = connect(mapStateToProps, mapDispatchToProps)(_GroupMenu);
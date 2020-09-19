import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Drawer, Divider, IconButton, TextField } from '@material-ui/core';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SubjectIcon from '@material-ui/icons/Subject';
import { MemberPreview } from '../BoardHeader/MemberPreview';
import { updateBoard } from '../../store/actions/boardActions.js';

export class _AboutBoard extends Component {
    state = {
        isEditDesc: false
    }
    onEditDesc = (ev) => {
        ev.preventDefault();
        console.log(ev.target.boardDesc.value)
        const newBoard = { ...this.props.board, description: ev.target.boardDesc.value };
        this.props.updateBoard(newBoard);
        this.setState({ isEditDesc: false });
    }
    render() {
        const { board, isShowing, onSetMenuOpt } = this.props;
        const { isEditDesc } = this.state;
        return (
            <div className="sidebar-container" >
                <Drawer classes={{ root: 'sidebar' }}
                    className="about-board"
                    anchor={'right'}
                    open={isShowing}
                    BackdropProps={{ hideBackdrop: true }}
                    variant={'persistent'}>
                    <div className="sidebar-header">
                        <h4>ABOUT THIS BOARD</h4>
                        <IconButton size="small" onClick={() => onSetMenuOpt(null)}>
                            <ArrowBackIosOutlinedIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <div className="about-container">
                        {board.createdBy && <div className="created-by">
                            <h5><PersonOutlineIcon /> CREATED BY</h5>
                            <div className="board-creator">
                                <MemberPreview name={board.createdBy.fullName} />
                                <span>{board.createdBy.fullName}</span>
                            </div>
                        </div>}
                        <Divider />
                        <div className="board-description">
                            <div className="description-header">
                                <h5><SubjectIcon /> DESCRIPTION</h5>
                                <button className="edit-desc-btn"
                                    onClick={() => this.setState({ isEditDesc: !this.state.isEditDesc })}>
                                    Edit desciption
                                </button>
                            </div>
                            {isEditDesc && <form onSubmit={(ev) => this.onEditDesc(ev)}>
                                <textarea name="boardDesc"
                                    autoFocus
                                    defaultValue={board.description}
                                    style={{ resize: 'none' }}
                                    cols="30" rows="10"
                                    onBlur={() => this.setState({ isEditDesc: false })}></textarea>
                                <div className="save-cancel-btns">
                                    <button className="save-btn">Save</button>
                                    <button className="cancel-btn"
                                        onClick={() => this.setState({ isEditDesc: false })}>Cancel</button>
                                </div>
                            </form>}
                            {!isEditDesc && <pre
                                style={{ cursor: 'pointer' }}
                                onClick={() => this.setState({ isEditDesc: true })} >
                                {board.description}
                            </pre>}
                        </div>
                    </div>
                </Drawer>
            </div >
        )
    }
}
const mapStateToProps = state => {
    return {
        board: state.boardReducer.board
    };
};
const mapDispatchToProps = {
    updateBoard
};
export const AboutBoard = connect(mapStateToProps, mapDispatchToProps)(_AboutBoard);

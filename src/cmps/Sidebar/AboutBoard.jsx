import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Drawer, Divider } from '@material-ui/core';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SubjectIcon from '@material-ui/icons/Subject';
import { MemberPreview } from '../BoardHeader/MemberPreview';
import { updateBoard } from '../../store/actions/boardActions.js';
import { SidebarHeader } from './SidebarHeader';

export class _AboutBoard extends Component {
    state = {
        isEditDesc: false,
        isEditTitle: false,
        currDesc: null,
        currTitle: null
    }
    setCurrDesc = (ev) => {
        const currDesc = ev.target.value;
        this.setState({ currDesc });

    }
    setCurrTitle = (ev) => {
        const currTitle = ev.target.value;
        this.setState({ currTitle });
    }
    onEditDesc = () => {
        const description = this.state.currDesc;
        if (description) {
            const newBoard = { ...this.props.board, description };
            this.props.updateBoard(newBoard);
        }
        this.setState({ isEditDesc: false });
    }
    onEditTitle = () => {
        const title = this.state.currTitle;
        if (title) {
            const newBoard = { ...this.props.board, title };
            this.props.updateBoard(newBoard);
        }
        this.setState({ isEditTitle: false });
    }
    render() {
        const { board, isShowing, onSetMenuOpt } = this.props;
        const { isEditDesc, isEditTitle } = this.state;
        return (
            <div className="sidebar-container" >
                <Drawer classes={{ root: 'sidebar' }}
                    className="about-board"
                    anchor={'right'}
                    open={isShowing}
                    BackdropProps={{ hideBackdrop: true }}
                    variant={'persistent'}>
                    <SidebarHeader titleTxt="ABOUT THIS BOARD" onSetMenuOpt={onSetMenuOpt} />
                    {isEditTitle
                        ? <div>
                            <input type="text" autoFocus 
                            defaultValue={board.title} 
                            onChange={(ev) => this.setCurrTitle(ev)} 
                            onBlur={() => this.setState({ isEditTitle: false })} />
                            <button type="button" className="save-btn" onMouseDown={this.onEditTitle}>Save</button>
                        </div>
                        : <h2 onClick={() => this.setState({ isEditTitle: true })}>{board.title}</h2>}
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
                            {isEditDesc && <React.Fragment>
                                <textarea name="boardDesc"
                                    autoFocus
                                    defaultValue={board.description}
                                    style={{ resize: 'none' }}
                                    cols="30" rows="10"
                                    onChange={(ev) => this.setCurrDesc(ev)}
                                    onBlur={() => this.setState({ isEditDesc: false })}></textarea>
                                <div className="save-cancel-btns">
                                    <button type="button" className="save-btn"
                                        onMouseDown={this.onEditDesc}>Save</button>
                                    <button className="cancel-btn"
                                        onClick={() => this.setState({ isEditDesc: false })}>Cancel</button>
                                </div>
                            </React.Fragment>}
                            {!isEditDesc && <pre
                                style={{ cursor: 'pointer' }}
                                onClick={() => this.setState({ isEditDesc: true })}>
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

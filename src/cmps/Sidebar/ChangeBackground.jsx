import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Drawer, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { updateBoard } from '../../store/actions/boardActions.js';


export class _ChangeBackground extends Component {
    onSetBoardStyle = (style) => {
        const newBoard = { ...this.props.board, style };
        this.props.updateBoard(newBoard);
    }
    render() {
        const { board, isShowing, onSetMenuOpt } = this.props;
        const anchor = 'right';
        const boardStyles = [
            {
                id: "bs101",
                bgClr: "#ffffff",
                bgImg: "url(https://image.freepik.com/free-vector/abstract-paper-hexagon-white-background_51543-7.jpg)"
            },
            {
                id: "bs102",
                bgClr: "#007AC0",
                bgImg: "url(https://static4.depositphotos.com/1001351/322/v/450/depositphotos_3223514-stock-illustration-grunge-abstract-background-eps-10.jpg)"
            }
        ];
        return (
            <div className="about-board sidebar-container" >
                <Drawer classes={{ root: 'sidebar' }}
                    anchor={anchor}
                    open={isShowing}
                    BackdropProps={{ hideBackdrop: true }}
                    variant={'persistent'}>
                    <div className="sidebar-header">
                        <h4>CHANGE BACKGROUND</h4>
                        <IconButton onClick={() => onSetMenuOpt(null)}>
                            <ArrowBackIosOutlinedIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <div className="changeBG-container">
                        <div className="style-pallete">
                            {boardStyles.map(style => {
                                return <div key={style.id}
                                    className="bg-style"
                                    style={{ backgroundColor: style.bgClr }}
                                    onClick={() => this.onSetBoardStyle(style)}>
                                    <div className="img-container" style={{ backgroundImage: style.bgImg }}>
                                    </div>
                                </div>
                            })}
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
export const ChangeBackground = connect(mapStateToProps, mapDispatchToProps)(_ChangeBackground);

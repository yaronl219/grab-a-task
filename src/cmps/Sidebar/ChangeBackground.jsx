import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Drawer, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { updateBoard, setStyle } from '../../store/actions/boardActions.js';
import bg1 from './../../assets/imgs/backgrounds/bg-1.jpg';
import { SidebarHeader } from './SidebarHeader.jsx';

export class _ChangeBackground extends Component {
    onSetBoardStyle = (style) => {
        const newBoard = { ...this.props.board, style };
        this.props.updateBoard(newBoard);
        this.props.setStyle(newBoard.style)
    }
    render() {
        const { board, isShowing, onSetMenuOpt } = this.props;
        const boardStyles = [
            {
                id: 'bs101',
                fontClr: '#f9f9f9',
                bgImg: 'url(https://res.cloudinary.com/duhz8ymod/image/upload/v1600708689/bg-1_ls68ox.jpg)'
            },
            {
                id: 'bs102',
                fontClr: '#f9f9f9',
                bgImg: 'url(https://res.cloudinary.com/duhz8ymod/image/upload/v1600708658/bg-2_r8mevb.jpg)'
            },
            {
                id: 'bs103',
                fontClr: '#f9f9f9',
                bgImg: 'url(https://res.cloudinary.com/duhz8ymod/image/upload/v1600708664/bg-3_vrhygl.jpg)'
            },
            {
                id: 'bs104',
                fontClr: '#f9f9f9',
                bgImg: 'url(https://res.cloudinary.com/duhz8ymod/image/upload/v1600708683/bg-4_jqpmcl.jpg)'
            },
            {
                id: 'bs105',
                fontClr: '#f9f9f9',
                bgImg: 'url(https://res.cloudinary.com/duhz8ymod/image/upload/v1600708662/bg-5_r4mz7j.jpg)'
            },
            {
                id: 'bs106',
                fontClr: '#f9f9f9',
                bgImg: 'url(https://res.cloudinary.com/duhz8ymod/image/upload/v1600708669/bg-6_tsrunp.jpg)'
            },
            {
                id: 'bs107',
                fontClr: '#f9f9f9',
                bgImg: 'url(https://res.cloudinary.com/duhz8ymod/image/upload/v1600708679/bg-7_g0tqic.jpg)'
            },
            {
                id: 'bs108',
                fontClr: '#f9f9f9',
                bgImg: 'url(https://res.cloudinary.com/duhz8ymod/image/upload/v1600708683/bg-8_hoe86h.jpg)'
            }
        ];
        return (
            <div className="about-board sidebar-container" >
                <Drawer classes={{ root: 'sidebar' }}
                    anchor={'right'}
                    open={isShowing}
                    BackdropProps={{ hideBackdrop: true }}
                    variant={'persistent'}>
                    <SidebarHeader titleTxt="CHANGE BACKGROUND" onSetMenuOpt={onSetMenuOpt} />
                    <div className="changeBG-container">
                        <div className="style-pallete">
                            {boardStyles.map(style => {
                                return <div key={style.id}
                                    className="bg-style"
                                    style={{
                                        backgroundColor: style.bgClr,
                                    }}
                                    onClick={() => this.onSetBoardStyle(style)}>
                                    <div className="img-container" style={{
                                        backgroundImage: style.bgImg,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover'
                                       
                                    }}></div>
                                    <div>Select</div>
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
    updateBoard,
    setStyle
};
export const ChangeBackground = connect(mapStateToProps, mapDispatchToProps)(_ChangeBackground);

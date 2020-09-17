import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Drawer, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import { loadBoard } from '../../store/actions/boardActions.js';


export class _SideArchive extends Component {
    async componentDidMount() {
        await this.props.loadBoard('b101');
    }
    onOpenCardDetails = (cardId) => {
        // to later be switched to using history

        let url = window.location.href
        url += cardId
        window.location.assign(url)
    }
    render() {
        const { board, isShowing, onSetMenuOpt } = this.props;
        const anchor = 'right';
        if (!board.groups) return <div>Loading...</div>;
        let archive = board.groups.filter(group => {
            return group.archivedAt || group.cards.find(card => card.archivedAt)
        });
        archive = archive.map(group => {
            if (group.archivedAt) return group;
            return {...group, cards: group.cards.filter(card => card.archivedAt)};
        });
        return (
            <div className="archive sidebar-container" >
                <Drawer classes={{ root: 'sidebar' }}
                    anchor={anchor}
                    open={isShowing}
                    BackdropProps={{ hideBackdrop: true }}
                    variant={"persistent"}>
                    <div className="sidebar-header">
                        <h4>Archive</h4>
                        <IconButton onClick={() => onSetMenuOpt(null)}>
                            <ArrowBackIosOutlinedIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <div className="archive-list-container">
                        {archive.map(group => {
                            if (group.cards.length === 0) return;
                            return <React.Fragment>
                                <h5>{group.title}</h5>
                                {group.cards.map(card => {
                                    return (
                                        <div className="archive-card-container">
                                            <div className="archive-card-preview" onClick={() => this.onOpenCardDetails(card.id)}>
                                                <span>{card.title}</span>
                                            </div>
                                            <div className="buttons">
                                                <IconButton>
                                                    <UnarchiveIcon fontSize='small' />
                                                </IconButton>
                                                <IconButton>
                                                    <CloseOutlinedIcon fontSize='small' />
                                                </IconButton>
                                            </div>
                                        </div>
                                    )
                                }
                                )}
                            </React.Fragment>
                        })}
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
    loadBoard
};

export const SideArchive = connect(mapStateToProps, mapDispatchToProps)(_SideArchive);

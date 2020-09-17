import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Drawer, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { loadBoard } from '../../store/actions/boardActions.js';

export class _SideArchive extends Component {
    async componentDidMount() {
        await this.props.loadBoard('b101');
    }
    render() {
        const { board, isShowing, onSetMenuOpt } = this.props;
        const anchor = 'right';
        if (!board.groups) return <div>Loading...</div>;
        const archivedCards = board.groups.map(group => group.cards.filter(card => card.archivedAt));
        console.log('archivedCards:', archivedCards)
        return (
            <div className="archive sidebar-container">
                <Drawer classes={{ root: 'sidebar' }}
                    anchor={anchor}
                    open={isShowing}
                    hideBackdrop
                    variant={"persistent"}>
                    <div className="sidebar-header">
                        <IconButton onClick={() => onSetMenuOpt(null)}>
                            <ArrowBackIosOutlinedIcon />
                        </IconButton>
                        <h4>Archive</h4>
                    </div>
                    <Divider />
                    <div className="archive-list-container">
                        <List>

                        </List>
                    </div>
                </Drawer>
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
    loadBoard
};

export const SideArchive = connect(mapStateToProps, mapDispatchToProps)(_SideArchive);

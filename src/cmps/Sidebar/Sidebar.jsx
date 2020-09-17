import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Filter } from '../BoardHeader/Filter'
import { AboutBoard } from './AboutBoard'
import { ChangeBackground } from './ChangeBackground'
import { SideArchive } from './SideArchive'
import { Drawer, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import WallpaperOutlinedIcon from '@material-ui/icons/WallpaperOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

export class _Sidebar extends Component {
    state = { selectedMenuOpt: null }
    onSetMenuOpt = (selectedMenuOpt) => { this.setState({ selectedMenuOpt }); }
    render() {
        const { board, isSidebarShowing, onToggleSidebar } = this.props;
        const { selectedMenuOpt } = this.state;
        const anchor = 'right';
        return (
            <div className="sidebar-container">
                <Drawer classes={{ root: 'sidebar' }}
                    anchor={anchor}
                    open={isSidebarShowing}
                    BackdropProps={{ hideBackdrop: true }}
                    variant={"persistent"}
                    onClose={() => onToggleSidebar(false)}>
                    <div className="sidebar-header">
                        <h4>Menu</h4>
                        <IconButton onClick={() => onToggleSidebar(false)}>
                            <CloseOutlinedIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem button onClick={() => { this.onSetMenuOpt('about') }}>
                            <ListItemIcon>
                                <InfoOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText>About this board</ListItemText>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <WallpaperOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText>Change background</ListItemText>
                        </ListItem>
                        {/* <ListItem button>
                            <SearchOutlinedIcon /> Search cards
                        </ListItem> */}
                        <ListItem button onClick={() => { this.onSetMenuOpt('archive') }}>
                            <ListItemIcon>
                                <ArchiveOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText>Archive</ListItemText>
                        </ListItem>
                    </List>
                    <Divider />

                </Drawer>
                <SideArchive isShowing={selectedMenuOpt === 'archive'}
                    onSetMenuOpt={this.onSetMenuOpt} />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        board: state.boardReducer.board
    };
};

export const Sidebar = connect(mapStateToProps)(_Sidebar);
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Drawer, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import WallpaperOutlinedIcon from '@material-ui/icons/WallpaperOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import { AboutBoard } from './AboutBoard'
import { ChangeBackground } from './ChangeBackground'
import { SideArchive } from './SideArchive'
import { ActivityLog } from './ActivityLog'

export class _Sidebar extends Component {
    state = { selectedMenuOpt: null }
    onSetMenuOpt = (selectedMenuOpt) => {
        this.setState({ selectedMenuOpt });
    }
    DynamicCmp = () => {
        const { selectedMenuOpt } = this.state;
        switch (selectedMenuOpt) {
            case 'about':
                return <AboutBoard isShowing={selectedMenuOpt === 'about'}
                    onSetMenuOpt={this.onSetMenuOpt} />;
            case 'changeBG':
                return <ChangeBackground isShowing={selectedMenuOpt === 'changeBG'}
                    onSetMenuOpt={this.onSetMenuOpt} />
            case 'archive':
                return <SideArchive isShowing={selectedMenuOpt === 'archive'}
                    onSetMenuOpt={this.onSetMenuOpt} />
            case null:
                return <React.Fragment></React.Fragment>
        }
    }
    render() {
        const { board, isSidebarShowing, onToggleSidebar } = this.props;
        const anchor = 'right';
        return (
            <div className="sidebar-container">
                <Drawer className="sidebar"
                    anchor={anchor}
                    open={isSidebarShowing}
                    BackdropProps={{ hideBackdrop: true }}
                    variant={"persistent"}
                    onClose={() => onToggleSidebar(false)}>
                    <div className="sidebar-header">
                        <h4>MENU</h4>
                        <IconButton size="small" onClick={() => onToggleSidebar(false)}>
                            <CloseOutlinedIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem button className="menu-btn" onClick={() => { this.onSetMenuOpt('about') }}>
                            <ListItemIcon><InfoOutlinedIcon /></ListItemIcon>
                            <ListItemText>About this board</ListItemText>
                        </ListItem>
                        <ListItem button className="menu-btn" onClick={() => { this.onSetMenuOpt('changeBG') }}>
                            <ListItemIcon><WallpaperOutlinedIcon /></ListItemIcon>
                            <ListItemText>Change background</ListItemText>
                        </ListItem>
                        <ListItem button className="menu-btn" onClick={() => { this.onSetMenuOpt('archive') }}>
                            <ListItemIcon><ArchiveOutlinedIcon /></ListItemIcon>
                            <ListItemText>Archive</ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    <h5><FormatListBulletedOutlinedIcon size="small" /> ACTIVITY LOG</h5>
                    <ActivityLog activities={board.activities} boardId={board._id} />
                </Drawer>

                {this.DynamicCmp()}
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
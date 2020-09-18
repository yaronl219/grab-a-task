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
    onSetMenuOpt = (selectedMenuOpt) => {
        this.setState({ selectedMenuOpt });
    }
    DynamicCmp = () => {
        const { selectedMenuOpt } = this.state;
        switch (selectedMenuOpt) {
            case 'about':
                return <AboutBoard isShowing={selectedMenuOpt === 'about'}
                    onSetMenuOpt={this.onSetMenuOpt} />;
            // case 'changeBG':
            case 'archive':
                return <SideArchive isShowing={selectedMenuOpt === 'archive'}
                    onSetMenuOpt={this.onSetMenuOpt} />
            case 'changeBG':
                return <ChangeBackground isShowing={selectedMenuOpt === 'changeBG'}
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
                        <h4>Menu</h4>
                        <IconButton className="icon-button" onClick={() => onToggleSidebar(false)}>
                            <CloseOutlinedIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem button onClick={() => { this.onSetMenuOpt('about') }}>
                            <ListItemIcon><InfoOutlinedIcon /></ListItemIcon>
                            <ListItemText>About this board</ListItemText>
                        </ListItem>
                        <ListItem button onClick={() => { this.onSetMenuOpt('changeBG') }}>
                            <ListItemIcon><WallpaperOutlinedIcon /></ListItemIcon>
                            <ListItemText>Change background</ListItemText>
                        </ListItem>
                        <ListItem button onClick={() => { this.onSetMenuOpt('archive') }}>
                            <ListItemIcon><ArchiveOutlinedIcon /></ListItemIcon>
                            <ListItemText>Archive</ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
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
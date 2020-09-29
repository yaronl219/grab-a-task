import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Drawer, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import WallpaperOutlinedIcon from '@material-ui/icons/WallpaperOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import { AboutBoard } from './AboutBoard'
import { ChangeBackground } from './ChangeBackground'
import { SideArchive } from './SideArchive'
import { ActivityLog } from './ActivityLog'
import { LabelPanel } from './LabelPanel';
import { CreateTemplate } from './CreateTemplate';
import { Link } from 'react-router-dom';


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
            case 'labels':
                return <LabelPanel isShowing={selectedMenuOpt === 'labels'}
                    onSetMenuOpt={this.onSetMenuOpt} />
            case null:
                return <React.Fragment></React.Fragment>
            default:
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
                        <ListItem button className="menu-btn" component={Link} to={`/analysis/${board._id}/`}>
                            <ListItemIcon><AssessmentOutlinedIcon /></ListItemIcon>
                            <ListItemText>Board analysis</ListItemText>
                        </ListItem>
                        <ListItem button className="menu-btn" onClick={() => { this.onSetMenuOpt('archive') }}>
                            <ListItemIcon><ArchiveOutlinedIcon /></ListItemIcon>
                            <ListItemText>Archive</ListItemText>
                        </ListItem>
                        <ListItem button className="menu-btn" onClick={() => { this.onSetMenuOpt('labels') }}>
                            <ListItemIcon><LabelOutlinedIcon /></ListItemIcon>
                            <ListItemText>Labels</ListItemText>
                        </ListItem>
                        <ListItem button className="menu-btn">
                            <CreateTemplate history={this.props.history} board={this.props.board} />
                        </ListItem>
                    </List>
                    <Divider />
                    <h5 className="activity-log-title"><FormatListBulletedOutlinedIcon size="small" />ACTIVITY LOG</h5>
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
import React, { Component } from 'react';
import { Drawer, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';

export class SideArchive extends Component {
    render() {
        const { isShowing, onSetMenuOpt } = this.props;
        const anchor = 'right';
        return (
            <div className="archive sidebar-container">
                <Drawer classes={{ root: 'sidebar' }}
                anchor={anchor}
                    open={isShowing}
                    BackdropProps={{ hideBackdrop: true }}
                    hideBackdrop
                    variant={"persistent"}>
                    <div className="sidebar-header">
                        <IconButton onClick={() => onSetMenuOpt(null)}>
                            <ArrowBackIosOutlinedIcon />
                        </IconButton>
                        <h4>Archive</h4>
                    </div>
                </Drawer>
            </div>
        )
    }
}

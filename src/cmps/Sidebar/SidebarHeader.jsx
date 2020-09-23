import React from 'react'
import { IconButton, Divider } from '@material-ui/core';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';


export function SidebarHeader({ titleTxt, onSetMenuOpt }) {
    return (
        <div className="sidebar-header">
            <h4>{titleTxt}</h4>
            <IconButton size="small" onClick={() => onSetMenuOpt(null)}>
                <ArrowBackIosOutlinedIcon />
            </IconButton>
            <Divider />
        </div>
    )
}

import { CardDueDateSetter } from "./CardDueDateSetter"
import React from 'react'
import { CardNewChecklist } from "./CardNewChecklist"
import { Button, CircularProgress } from "@material-ui/core"
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import WebAssetOutlinedIcon from '@material-ui/icons/WebAssetOutlined';

export function CardSidebar(props) {

    return (
        <div className="card-sidebar">
            {/* <Button><ArrowForwardIcon /><span>Move Card</span></Button> */}
            <Button ref={props.anchorRef} onClick={props.toggleCoverSelector}><WebAssetOutlinedIcon /><span>Cover</span></Button>
            <CardDueDateSetter dueDate={props.dueDate} onUpdateDueDate={props.onUpdateDueDate} />
            <Button onClick={props.onArchiveCard}><ArchiveOutlinedIcon /> <span>Archive Card</span></Button>
            <Button onClick={props.toggleLabelPallete}><LabelOutlinedIcon /><span>Labels</span></Button>
            <Button ref={props.anchorRef} onClick={props.toggleDisplayMembers}><PeopleAltOutlinedIcon /><span>Members</span></Button>
            {(props.isUploading) ? <Button disabled><CircularProgress size='14px' /></Button> : <Button onClick={props.toggleUploadDropzone}><ImageOutlinedIcon /> Upload Image</Button>}
            <CardNewChecklist addActivity={props.addActivity} onUpdate={props.onUpdateChecklists} />
        </div>
    )
}

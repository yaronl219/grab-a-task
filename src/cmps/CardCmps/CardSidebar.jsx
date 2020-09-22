import { CardDueDateSetter } from "./CardDueDateSetter"
import React from 'react'
import { CardNewChecklist } from "./CardNewChecklist"
import { Button } from "@material-ui/core"
import ArchiveIcon from '@material-ui/icons/Archive';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';


export function CardSidebar(props) {
    
    return (
        <div className="card-sidebar">
            <Button><ArrowForwardIcon /><span>Move Card</span></Button>
            <CardDueDateSetter dueDate={props.dueDate} onUpdateDueDate={props.onUpdateDueDate}/>
            <Button onClick={props.onArchiveCard}><ArchiveIcon /> <span>Archive Card</span></Button>
            <Button onClick={props.toggleLabelPallete}><LabelOutlinedIcon /><span>Labels</span></Button>
            <Button ref={props.anchorRef} onClick={props.toggleDisplayMembers}><PeopleAltOutlinedIcon /><span>Members</span></Button>
            <CardNewChecklist addActivity={props.addActivity} onUpdate={props.onUpdateChecklists} />
        </div>
    )
}

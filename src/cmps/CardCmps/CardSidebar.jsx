import { CardDueDateSetter } from "./CardDueDateSetter"
import React from 'react'
import { CardNewChecklist } from "./CardNewChecklist"
import { Button } from "@material-ui/core"
import ArchiveIcon from '@material-ui/icons/Archive';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export function CardSidebar(props) {
    return (
        <div className="card-sidebar">
            <Button><ArrowForwardIcon /><span>Move Card</span></Button>
            <CardDueDateSetter dueDate={props.dueDate} onUpdateDueDate={props.onUpdateDueDate}/>
            <Button onClick={props.onArchiveCard}><ArchiveIcon /> <span>Archive Card</span></Button>
            <CardNewChecklist addActivity={props.addActivity} onUpdate={props.onUpdateChecklists} />
        </div>
    )
}

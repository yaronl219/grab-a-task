import { CardDueDateSetter } from "./CardDueDateSetter"
import React from 'react'
import { CardNewChecklist } from "./CardNewChecklist"
import { Button } from "@material-ui/core"
import { LabelPanel } from "../Sidebar/LabelPanel"



export function CardSidebar(props) {
    return (
        <div className="card-sidebar">
            <Button>Move Card</Button>
            <CardDueDateSetter dueDate={props.dueDate} onUpdateDueDate={props.onUpdateDueDate} />
            <Button>Labels</Button>
            <Button onClick={props.onArchiveCard}>Archive Card</Button>
            <CardNewChecklist addActivity={props.addActivity} onUpdate={props.onUpdateChecklists} />
        </div>
    )
}

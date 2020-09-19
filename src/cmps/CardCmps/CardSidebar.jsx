import { CardDueDateSetter } from "./CardDueDateSetter"
import React from 'react'



export function CardSidebar(props) {
    return (
        <div className="card-sidebar">
            <button>Move Card</button>
            <CardDueDateSetter dueDate={props.dueDate} onUpdateDueDate={props.onUpdateDueDate}/>
            <button onClick={props.onArchiveCard}>Archive Card</button>

        </div>
    )
}

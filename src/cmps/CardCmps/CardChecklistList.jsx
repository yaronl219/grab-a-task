import React from 'react'
import { CardChecklist } from './CardChecklist'
import { CardChecklistTodo } from './CardChecklistTodo'

export function CardChecklistList(props) {
    if (!props.checklists || !props.checklists.length) return <React.Fragment />
    return (
        <div className="checklists-container">
            <h3>Checklists</h3>
           {props.checklists.map(checklist => <CardChecklist key={checklist.id} checklist={checklist} onUpdate={props.onUpdate}/>)} 
            {/* <CardChecklistTodo  */}
        </div>
    )
}

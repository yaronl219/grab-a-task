import React from 'react'
import { CardChecklist } from './CardChecklist'


export function CardChecklistList(props) {
    if (!props.checklists || !props.checklists.length) return <React.Fragment />
    return (
        <div className="checklists-container">
           {props.checklists.map(checklist => <CardChecklist key={checklist.id} checklist={checklist} addActivity={props.addActivity} onUpdate={props.onUpdate}/>)} 
            {/* <CardChecklistTodo  */}
        </div>
    )
}

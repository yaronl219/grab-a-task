import React from 'react'
import { switchGroup } from '../../store/actions/boardActions'

export function CardPreviewDueDate(props) {
    if (!props.dueDate) return <React.Fragment />
    let daysRemaining = (props.dueDate - Date.now()) / 1000 / 60 / 60 / 24
    
    const date = new Date(props.dueDate)
    
    let month = date.toLocaleString("en-US", { month: "short" })
    let day = date.getDate()

    let parsedDate = `${month} ${day}`
    if (Math.abs(daysRemaining) > 365) {
        let year = date.getFullYear()
        parsedDate += `, ${year}`
    }

    let dueDateClass = 'card-preview-due-date-container card-preview-due-date-container-'
    console.log(daysRemaining)
    switch (true) {
        case (daysRemaining > 7):
            dueDateClass += 'long'
            break
        case (daysRemaining > 3):
            dueDateClass += 'near'
            break
        case (daysRemaining >= 0):
            console.log('more than 0')
            dueDateClass += 'close'
            break
        default:
            dueDateClass += 'overdue'
    }


    return (
        <div className={dueDateClass}>
            {parsedDate}
        </div>
    )
}

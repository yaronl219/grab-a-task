import React from 'react'
import { CardDetailsAttachment } from './CardDetailsAttachment'

export function CardImagesList(props) {
    // console.log(props)
    
    if (!props.attachments) return <React.Fragment />
    return (
        <div className="card-attachments-container">
            {props.attachments.map(att => <CardDetailsAttachment key={att.id} onUpdate={props.onUpdate} attachment={att} />)}
        </div>
    )
}

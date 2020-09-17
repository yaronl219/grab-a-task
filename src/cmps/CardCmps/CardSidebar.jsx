import React from 'react'

export function CardSidebar(props) {
    return (
        <div className="card-sidebar">
            <button>Move Card</button>
            <button onClick={props.onArchiveCard}>Archive Card</button>
        </div>
    )
}

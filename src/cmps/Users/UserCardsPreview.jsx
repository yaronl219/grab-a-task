import React from 'react'

export function UserCardsPreview({ board, cards, groups, displayArchived,onSelectBoard }) {

    if (!displayArchived && board.isArchived) return <React.Fragment />

    return (

        <div className="user-board" style={{backgroundImage:board.style.bgImg}}>
            <div className="user-board-header" style={{color:board.style.fontClr}}>
                <h3>{board.title}</h3>
            </div>
            <div className="user-cards-preview">
                {(!cards || !cards.length) ? (<div className="user-cards-none">No cards assigned to you in this boards </div>)
                    : cards.map((card, idx) => {
                        const cardCreatedAt = new Date(card.createdAt)
                        return (<div key={card.id} onClick={() => onSelectBoard(`/board/${board.id}/${card.id}`)} className="user-card-preview">
                            <div className="user-card-header">
                                <div><h5>{card.title}</h5></div>
                                <div><small>In group {groups[idx].title}</small></div>
                            </div>
                            <div className="user-card-details">
                            <div>{card.description}</div>
                            <div>Created at {cardCreatedAt.toLocaleString()}</div>
                            {(!card.dueDate) ? <React.Fragment /> : <div>Card due by {card.dueDate}</div>}
                            </div>
                        </div>)
                    })}
            </div>
        </div>
    )
}

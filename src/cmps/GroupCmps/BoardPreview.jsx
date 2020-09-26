import React from 'react'
import { MemberPreview } from '../BoardHeader/MemberPreview'


export function BoardPreview(props) {
    const board = props.board

    if (board.isArchived) return <React.Fragment />
    const createdAt = new Date (board.createdAt).toDateString()
    let lastEdited
    try {
         lastEdited = new Date (board.activities[0].createdAt).toDateString() || "1123"
    } catch (err) {
         lastEdited = createdAt
    }
    

    return (
        <div className="board-preview">
            <div className="board-image" onClick={() => props.onSelect(board._id)} style={{ backgroundImage: board.style.bgImg, backgroundColor: board.style.boardColor }}>
                <div className="board-overlay">
                <h3 style={{ color: board.style.fontClr }}>{board.title}</h3>
                </div>
            </div>
            <div className="board-details">
                <div className="board-description">
                    {board.description}
                </div>
                <div className="board-members">
                    {board.members.map((member,idx) => <MemberPreview key={idx} name={member.fullName} imgUrl={member.imgUrl}/>)}
                </div>
                <div className="board-creator">
                    Board created by {board.createdBy.fullName} on {createdAt}
                </div>
                <div className="board-last-edited">
                    Last edited on {lastEdited}
                </div>
            </div>
        </div>
    )
}

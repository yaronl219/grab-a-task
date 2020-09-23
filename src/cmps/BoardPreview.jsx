import React from 'react'
import { MemberList } from './BoardHeader/MemberList'

export function BoardPreview(props) {
    console.log(props)
    const board = props.board

    const createdAt = new Date (board.createdAt).toDateString()
    const lastEdited = new Date (board.activities[0].createdAt).toDateString()

    return (
        <div className="board-preview">
            <div className="board-image" onClick={() => props.history.push(`board/${board._id}`)} style={{ backgroundImage: board.style.bgImg }}>
                <div className="board-overlay">
                <h3 style={{ color: board.style.fontClr }}>{board.title}</h3>
                </div>
            </div>
            <div className="board-details">
                <div className="board-description">
                    {board.description}
                </div>
                {/* <div className="board-members"> */}
                    {/* <MemberList members={board.members} /> */}
                {/* </div> */}
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

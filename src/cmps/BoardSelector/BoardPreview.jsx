import React from 'react'
import { MemberPreview } from '../BoardHeader/MemberPreview'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';


export function BoardPreview(props) {

    const board = props.board

    if (board.isArchived && !props.displayArchived) return <React.Fragment />
    const createdAt = new Date(board.createdAt).toDateString()
    let lastEdited
    try {
        lastEdited = new Date(board.activities[0].createdAt).toDateString() || "1123"
    } catch (err) {
        lastEdited = createdAt
    }


    return (
        <div className="board-preview">

            <div className="board-image" onClick={() => props.onSelect(board._id)} style={{ backgroundImage: board.style.bgImg, backgroundColor: board.style.boardColor }}>
            <div className="remove" onClick={(ev) => {
                ev.stopPropagation()
                props.onRemove(board._id)
            }}>
                    <DeleteOutlineOutlinedIcon size="small" />
            </div>
                <div className="board-overlay">
                    <h3 style={{ color: board.style.fontClr }}>{board.title}</h3>
                </div>
            </div>
            <div className="board-details">
                <div className="board-description">
                    {board.description}
                </div>
                <div className="board-members">
                    {board.members.map((member, idx) => <MemberPreview key={idx} name={member.fullName} imgUrl={member.imgUrl} />)}
                </div>
                {(board.createdAt && board.createdBy) ? (<React.Fragment><div className="board-creator">
                    Board created by {board.createdBy.fullName} on {createdAt}
                </div>
                    <div className="board-last-edited">
                        Last edited on {lastEdited}
                    </div></React.Fragment>) : <React.Fragment />
                }
            </div>
        </div>
    )
}

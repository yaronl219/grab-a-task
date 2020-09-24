import { CircularProgress } from '@material-ui/core'
import { BoardPreview } from '../cmps/BoardPreview'
import React from 'react'

export function BoardHub(props) {
    if (!props.boards) return <div className="board-hub"><CircularProgress /></div>
    return (

        <div className="board-hub">
            
            <header>
                <h1>{props.header}</h1>
            </header>
            <section>
                {props.boards.map(board => <BoardPreview key={board._id} history={props.history} onSelect={props.onSelect} board={board} />)}
            </section>

        
        </div>
    )
}

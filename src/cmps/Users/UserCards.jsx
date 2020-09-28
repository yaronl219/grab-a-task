import { CircularProgress } from '@material-ui/core'
import React, { Component } from 'react'
import { UserCardsPreview } from './UserCardsPreview'

export class UserCards extends Component {

    state = {
        displayArchived: false

    }

    onSelectBoard = (path) => {
        this.props.onCloseUserDetails()
        this.props.history.push(path)
    }

    render() {
        
        if (!this.props.userData) return <CircularProgress />
        const entries = this.props.userData
        return (
            <div className="user-cards-container">
                <div className="user-boards">
                    {(entries.length) ? entries.map((entry,idx) => <UserCardsPreview key={idx} onSelectBoard={this.onSelectBoard} board={entry.board} displayArchived={this.state.displayArchived} cards={entry.cards} groups={entry.groups} />)
                     : <React.Fragment />}
                </div>

            </div>
        )
    }
}


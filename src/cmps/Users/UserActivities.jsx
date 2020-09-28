import { CircularProgress, InputLabel, NativeSelect } from '@material-ui/core'
import { ActivityLog } from '../Sidebar/ActivityLog'


import React, { Component } from 'react'

export class UserActivities extends Component {

    state = {
        selectedBoard: null,
        boards: null,
        activities: null
    }



    componentDidMount() {
        this.getActivitiesFromProps()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.activities !== this.props.activities) {
            this.getActivitiesFromProps()
        }
    }

    onChange = (ev) => {
        const selection = ev.target.value
        if (selection === 'All') {
            this.setState({ selectedBoard: null })
        } else {
            this.setState({ selectedBoard: selection })
        }
    }

    getActivitiesFromProps = () => {
        if (this.props.activities) {

            let activities = this.props.activities.map(activity => activity.activity)
            this.setState({ activities }, () => {
                
                this.getBoardList()
                
            })
        }
    }

    getBoardList = () => {
        const uniqueIds = {}
        this.props.activities.forEach(activity => {
            uniqueIds[activity.board.id] = activity.board
        })
        const uniqueBoards = Object.values(uniqueIds)

        this.setState({ boards: uniqueBoards })
    }

    getFilteredActivites = () => {
        var activities;
        if (!this.state.selectedBoard) {
            activities = this.state.activities
        } else {
            activities = this.state.activities.filter(activity => activity.boardId === this.state.selectedBoard)
        }
        
        return activities
    }

    render() {
        if (!this.state.boards) return <CircularProgress />
        return (
            <div className="user-activities">
                <div className="board-filter">
                <InputLabel id="board-filter">Filter by board</InputLabel>
                    <NativeSelect id="board-filter" onChange={this.onChange} label="Filter by board">
                        <option value="All">All</option>
                        {this.state.boards.map((board,idx) => <option key={idx} value={board.id}>{board.title}</option>)}
                    </NativeSelect>
                </div>
                <div className="activity-log-container">
                    <ActivityLog activities={this.getFilteredActivites()} displayMode="user" />
                </div>
            </div>
        )
    }
}

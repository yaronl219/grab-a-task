import { CircularProgress } from '@material-ui/core'
import React, { Component } from 'react'
import { BoardPreview } from '../cmps/BoardPreview'
import { boardService } from '../services/boardService'

export class BoardHub extends Component {
    
    state = {
        boards: null
    }
    componentDidMount() {
        
        this.getAllBoards()
    }
    

    getAllBoards = async() => {
        const boards = await boardService.query()
        this.setState({boards}) 
    }
    
    render() {
        if (!this.state.boards) return <div class="board-hub"><CircularProgress /></div>
        return (
            <div class="board-hub">
                <header>
                    <h1>Boards</h1>
                </header>
                <section>
                    {this.state.boards.map(board => <BoardPreview key={board._id} history={this.props.history} board={board} /> )}
                </section>
            </div>
        )
    }
}

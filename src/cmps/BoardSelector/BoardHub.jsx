import { CircularProgress } from '@material-ui/core'

import React, { Component } from 'react'
import { setDefaultStyle } from '../../store/actions/boardActions'
import { connect } from 'react-redux'
import { BoardPreview } from './BoardPreview'
import AddIcon from '@material-ui/icons/Add';

export class _BoardHub extends Component {


    componentDidMount() {
        this.props.setDefaultStyle()

    }
    
    render(){
        
        if (!this.props.boards || this.props.isLoading) return <div className="board-hub"><div className="circular-progress-container"><CircularProgress /></div></div>
        return (
            <div className="board-hub">
                <header>
                    <h1>{this.props.header}</h1>
                </header>
                <section>
                    {(this.props.createBoard) ? <div className="new-board-placeholder" onClick={this.props.onAddBoard} ><div className="fake-board"><AddIcon /></div><div className="board-description">Add new board</div></div> : <React.Fragment />}
                    {this.props.boards.map(board => <BoardPreview key={board._id} onRemove={this.props.onRemove} history={this.props.history} onSelect={this.props.onSelect} board={board} />)}
                </section>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardReducer.board
    };
};

const mapDispatchToProps = {
    setDefaultStyle

};
export const BoardHub = connect(mapStateToProps, mapDispatchToProps)(_BoardHub);

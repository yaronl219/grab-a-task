import { CircularProgress } from '@material-ui/core'
import { BoardPreview } from '../cmps/BoardPreview'
import React, { Component } from 'react'
import { setDefaultStyle } from '../store/actions/boardActions'
import { connect } from 'react-redux'

export class _BoardHub extends Component {


    componentDidMount() {
        this.props.setDefaultStyle()
    }
    
    render(){

        if (!this.props.boards) return <div className="board-hub"><CircularProgress /></div>
        return (
            <div className="board-hub">
                <header>
                    <h1>{this.props.header}</h1>
                </header>
                <section>
                    {this.props.boards.map(board => <BoardPreview key={board._id} history={this.props.history} onSelect={this.props.onSelect} board={board} />)}
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

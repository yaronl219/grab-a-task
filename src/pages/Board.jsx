import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BoardHeader } from '../cmps/BoardHeader/BoardHeader';
import { GroupList } from '../cmps/GroupList';

import { Sidebar } from '../cmps/Sidebar/Sidebar';
// import { connect } from 'socket.io-client';
import { loadBoard } from '../store/actions/boardActions';


class _Board extends Component {
    async componentDidMount() {
        await this.props.loadBoard('b101')
        // console.log(this.props.board)

    }
    

    onFilter = () => {

    }
    onOpenSidebar = () => {

    }

    render() {
        const  {board} = this.props
        if (!board) return <div>Loading...</div>
        return (
            <div>
                <BoardHeader members={board.members} onOpenSidebar={this.onOpenSidebar} title={board.title} onFilter={this.onFilter} />
                <Sidebar />
                {(board.groups) ? <GroupList groups={board.groups} /> : <div>sdf</div>}
               This is a board 
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
  loadBoard
};

export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board);

import { CircularProgress } from '@material-ui/core';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BoardHeader } from '../cmps/BoardHeader/BoardHeader';
import { CardDetails } from '../cmps/CardCmps/CardDetails';
import { GroupList } from '../cmps/GroupList';

import { Sidebar } from '../cmps/Sidebar/Sidebar';
// import { connect } from 'socket.io-client';
import { loadBoard, onSetFilterBy, setStyle } from '../store/actions/boardActions';



class _Board extends Component {

  state = {
    isSidebarShowing: false
  }

  onToggleSidebar = (isSidebarShowing) => {
    this.setState({ isSidebarShowing });
  }

  async componentDidMount() {
    await this.props.loadBoard('b101')
    this.props.setStyle(this.props.board.style)
  }

  onFilter = (filterBy) => {
    // this filter is sent to actions without updating the store yet
    this.props.onSetFilterBy(this.props.board, filterBy)
  }

  onAddGroup = (txt) => {
    return txt
  }

  render() {

    const { board } = this.props
    if (!board) return <div>Loading...</div>

    return (
      <React.Fragment>
      {(this.props.match.params.cardId) ? <CardDetails cardId={this.props.match.params.cardId} boardId={this.props.match.params.id} history={this.props.history} /> : <div></div>}
      <div className="board-container">
        
        <BoardHeader title={board.title}
          members={board.members}
          onToggleSidebar={this.onToggleSidebar}
          onFilter={this.onFilter}
          style={board.style} />
          
        <Sidebar board={board}
          isSidebarShowing={this.state.isSidebarShowing}
          onToggleSidebar={this.onToggleSidebar} />
        {(board.groups) ? <GroupList style={board.style} onAddGroup={this.onAddGroup} groups={board.groups} /> : <CircularProgress />}
        
      </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    board: state.boardReducer.board,
    filterBy: state.boardReducer.filterBy
  };
};

const mapDispatchToProps = {
  loadBoard,
  onSetFilterBy,
  setStyle
};

export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board);

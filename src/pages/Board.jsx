import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BoardHeader } from '../cmps/BoardHeader/BoardHeader';
import { CardDetails } from '../cmps/CardCmps/CardDetails';
import { GroupList } from '../cmps/GroupList';

import { Sidebar } from '../cmps/Sidebar/Sidebar';
// import { connect } from 'socket.io-client';
import { loadBoard } from '../store/actions/boardActions';


class _Board extends Component {

  state = {
    filterBy: null,
    isSidebarShowing: false
  }

  onToggleSidebar = (isSidebarShowing) => {
    this.setState({ isSidebarShowing });
  }
  async componentDidMount() {
    await this.props.loadBoard('b101')
  }

  onFilter = (filterBy) => {
    // console.log(filterBy)
    this.setState({ filterBy })

  }

  getSearchResults() {
    const { filterBy } = this.state
    if (!filterBy || !Object.keys(filterBy).length) return this.props.board
    const searchTxt = filterBy.txt.toLowerCase()
    console.log(searchTxt)
    console.log(this.props.board)
  }

  onAddGroup = (txt) => {
    console.log(txt)
    return txt
  }

  render() {
    const { board } = this.props
    if (!board) return <div>Loading...</div>
    if (this.state) this.getSearchResults()


    return (
      <div>
        <BoardHeader title={board.title} 
        members={board.members} 
        onToggleSidebar={this.onToggleSidebar} 
        onFilter={this.onFilter} />
        <Sidebar board={board} 
        isSidebarShowing={this.state.isSidebarShowing} 
        onToggleSidebar={this.onToggleSidebar} />
        {(board.groups) ? <GroupList onAddGroup={this.onAddGroup} groups={board.groups} /> : <div>sdf</div>}
        {(this.props.match.params.cardId) ? <CardDetails cardId={this.props.match.params.cardId} history={this.props.history} /> : <div></div>}
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

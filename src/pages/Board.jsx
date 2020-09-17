import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BoardHeader } from '../cmps/BoardHeader/BoardHeader';
import { GroupList } from '../cmps/GroupList';

import { Sidebar } from '../cmps/Sidebar/Sidebar';
// import { connect } from 'socket.io-client';
import { loadBoard } from '../store/actions/boardActions';


class _Board extends Component {

  state = {
    filterBy: null,
    isSidebarShowing: true
  }

  async componentDidMount() {
    await this.props.loadBoard('b101')
  }
  onToggleSidebar = (isSidebarShowing) => {
    this.setState({ isSidebarShowing });
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

  onOpenSidebar = () => {

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
        <BoardHeader members={board.members} onToggleSidebar={this.onToggleSidebar} title={board.title} onFilter={this.onFilter} />
        <Sidebar board={board} isSidebarShowing={this.state.isSidebarShowing} onToggleSidebar={this.onToggleSidebar} />
        {(board.groups) ? <GroupList onAddGroup={this.onAddGroup} groups={board.groups} /> : <div>sdf</div>}
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

import { CircularProgress } from '@material-ui/core';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BoardHeader } from '../cmps/BoardHeader/BoardHeader';
import { CardDetails } from '../cmps/CardCmps/CardDetails';
import { GroupList } from '../cmps/GroupList';
import { Notify } from '../cmps/Notify'
import { Sidebar } from '../cmps/Sidebar/Sidebar';
// import { connect } from 'socket.io-client';
import { loadBoard, onSetFilterBy, setStyle } from '../store/actions/boardActions';
import socketService from '../services/socketService.js'
import { ToastContainer, toast } from 'react-toastify';

import { diff, addedDiff, deletedDiff, updatedDiff, detailedDiff } from 'deep-object-diff';


class _Board extends Component {

  state = {
    isSidebarShowing: false,
    prevBoard: null
  }

  async componentDidMount() {
    // await this.props.loadBoard('5f6a0f6e973d861c5d72eb3f')
    const boardId = this.props.match.params.id
    try {
      await this.props.loadBoard(boardId)
      // console.log(this)
      this.props.setStyle(this.props.board.style)
      socketService.setup()
      socketService.on('init board', () => console.log(this.props.board._id))
      socketService.emit('entered-board', this.props.board._id)
      socketService.on('board-updated', async updatedBoard => {
        
        const prevBoard = JSON.parse(JSON.stringify(this.props.board))
        await this.props.loadBoard(updatedBoard._id)
        this.remoteUpdate(prevBoard)
      })
    } catch (err) {
      toast.error('Oops! we seem to be missing the board you\'re looking for. going back to board selection.', {
        position: "bottom-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        this.props.history.push('/board')
      }, 1000)
    }

  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.board.groups !== this.props.board.groups) {
  //     const differ = detailedDiff(prevProps.board.groups, this.props.board.groups)
  //     console.log(differ)
  //   }
  // }
  

  remoteUpdate = (prevBoard) => {
    // this details the difference between the previous board and the current board
    const differ = detailedDiff(prevBoard, this.props.board)
    // if there are no differences - return
    if (!Object.keys(differ.added).length && !Object.keys(differ.deleted).length && !Object.keys(differ.updated).length) return console.log('nothing to update')

    console.log(differ)
    // if there are differences - notify the user
    toast.success('The board has been updated!', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
  
  componentWillUnmount() {
    socketService.off('board-updated')
    socketService.terminate()
  }


  getBoardFromParams = async () => {
    const boardId = this.props.match.params.id
    try {
      await this.props.loadBoard(boardId)
      this.props.setStyle(this.props.board.style)
      socketService.on('init board', () => console.log(this.props.board._id))
    } catch (err) {
      toast.error('Oops! we seem to be missing the board you\'re looking for. going back to board selection.', {
        position: "bottom-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        this.props.history.push('/board')
      }, 1000)
    }
  }



  onToggleSidebar = (isSidebarShowing) => {
    this.setState({ isSidebarShowing });
  }

  onFilter = (filterBy) => {
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
            style={board.style}
            users={this.props.allUsers}
          />

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

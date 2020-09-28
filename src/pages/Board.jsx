import { CircularProgress } from '@material-ui/core';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BoardHeader } from '../cmps/BoardHeader/BoardHeader';
import { CardDetails } from '../cmps/CardCmps/CardDetails';
import { GroupList } from '../cmps/GroupList';
import { Sidebar } from '../cmps/Sidebar/Sidebar';
// import { connect } from 'socket.io-client';
import { loadBoard, onSetFilterBy, setStyle, resetBoard } from '../store/actions/boardActions';
import socketService from '../services/socketService.js'
import { toast } from 'react-toastify';

import { detailedDiff } from 'deep-object-diff';


class _Board extends Component {

  state = {
    isSidebarShowing: false,
    lastReceivedUpdateAt: null
  }

  async componentDidMount() {
    
    // await this.props.loadBoard('5f6a0f6e973d861c5d72eb3f')
    const boardId = this.props.match.params.id
    socketService.setup()
    try {
      await this.props.loadBoard(boardId)
      // console.log(this)
      this.props.setStyle(this.props.board.style)
      socketService.on('init board', () => console.log(this.props.board._id))
      socketService.emit('entered-board', this.props.board._id)
      socketService.on('board-updated', async updatedBoard => {
        
        const prevBoard = JSON.parse(JSON.stringify(this.props.board))
        await this.props.loadBoard(updatedBoard._id)
        this.showUpdateMessage(prevBoard)
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


  showUpdateMessage = (prevBoard) => {
    // this details the difference between the previous board and the current board
    const differ = detailedDiff(prevBoard, this.props.board)
    // if there are no differences - return
    if (!Object.keys(differ.added).length && !Object.keys(differ.deleted).length && !Object.keys(differ.updated).length) return console.log('nothing to update')

    // if there are differences - sets the last received update time
    this.setState({ lastReceivedUpdateAt: Date.now() })

    // toast.success('The board has been updated!', {
    //   position: "bottom-right",
    //   autoClose: 2000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
  }

  componentWillUnmount() {
    
      socketService.off('board-updated')
      socketService.terminate()
    
    this.props.resetBoard()
  }


  getBoardFromParams = async () => {
    const boardId = this.props.match.params.id
    try {
      await this.props.loadBoard(boardId)
      socketService.on('init board', () => console.log('init board',this.props.board._id))
      this.props.setStyle(this.props.board.style)
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
    if (!board) return <div className="board-container"><CircularProgress /></div>

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
            lastUpdate={this.state.lastReceivedUpdateAt}
          />

          <Sidebar board={board} history = {this.props.history}
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
  setStyle,
  resetBoard

};

export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board);

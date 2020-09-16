import React, { Component } from 'react'
import { connect } from 'react-redux';
// import { connect } from 'socket.io-client';
import { loadBoard } from '../store/actions/boardActions';


class _Board extends Component {
    async componentDidMount() {
        await this.props.loadBoard('b101')
        console.log(this.props.board)

    }
    
    render() {
        return (
            <div>
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
  
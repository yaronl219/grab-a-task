import React, { Component } from 'react';
import logo from './logo.svg';
import { Home } from './pages/Home';
import './assets/styles/global.scss'
import { Route, Switch } from 'react-router';
import { CardDetails } from './cmps/CardCmps/CardDetails';
import { Board } from './pages/Board';
import { Navbar } from './cmps/Navbar';

import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { connect } from 'react-redux';
import { updateBoard, updatePosition } from './store/actions/boardActions';


class _App extends Component {

  onDragEnd = (result) => {

      const { destination, source, draggableId, type } = result

      if(!destination) return
      if(destination.droppableId === source.droppableId && destination.index === source.index) return


      if(type === 'group'){

        const newGroupsOrder = Array.from(this.props.board.groups)
        const currGroup = this.props.board.groups.find(group => group.id === draggableId)
        newGroupsOrder.splice(source.index, 1)
        newGroupsOrder.splice(destination.index, 0, currGroup)

        const newBoard = {...this.props.board, groups: newGroupsOrder}
        this.props.updatePosition(newBoard)
        this.props.updateBoard(newBoard)
        return
        
      }

      if(type === 'card'){
        const startGroupIndex = this.props.board.groups.findIndex(group => group.id === source.droppableId)
        const endGroupIndex = this.props.board.groups.findIndex(group => group.id === destination.droppableId)

        // moving in the same group
        if (source.droppableId === destination.droppableId){
  
            const currGroup = this.props.board.groups.find(group => group.id === source.droppableId)
            const currCard = currGroup.cards.find(card => card.id === draggableId)
            const newCardsGroup = Array.from(currGroup.cards)
            newCardsGroup.splice(source.index, 1)
            newCardsGroup.splice(destination.index,0,currCard)
            const newGroup = {...currGroup, cards: newCardsGroup}
            const newGroups = [...this.props.board.groups]
            newGroups[startGroupIndex] = newGroup
            const newBoard = {...this.props.board, groups: newGroups}
            this.props.updatePosition(newBoard)
            return
        }
  
        // moving between groups
        if (source.droppableId !== destination.droppableId){
          
            const destinationGroup = this.props.board.groups.find(group => group.id === destination.droppableId)
            const formerGroup = this.props.board.groups.find(group => group.id === source.droppableId)
            const currCard = formerGroup.cards.find(card => card.id === draggableId)
            const formerCardIndex = formerGroup.cards.findIndex(card => card.id === draggableId)
            const newCardsArray = Array.from(destinationGroup.cards)
                    
            newCardsArray.splice(destination.index, 0, currCard)
            formerGroup.cards.splice(formerCardIndex, 1)
  
            const newGroups = [...this.props.board.groups]
            newGroups[startGroupIndex] = formerGroup
            newGroups[endGroupIndex].cards = newCardsArray        
  
            const newBoard = {...this.props.board, groups: newGroups}
            this.props.updatePosition(newBoard)
            this.props.updateBoard(newBoard)
            return
        }
      }
  }

  render(){

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="App">
            <header className="App-header">
              <Navbar />
            </header>

            <Switch>
              <Route path="/board/:id/:cardId?" component={Board} exact />
              <Route component={Board} path='/' />
            </Switch>
          </div>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => {
  return {
    board: state.boardReducer.board
  }
}

const mapDispatchToProps = {
  updateBoard,
  updatePosition
};

export const App = connect(mapStateToProps, mapDispatchToProps)(_App);


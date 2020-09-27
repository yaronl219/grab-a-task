import React, { Component } from 'react';
import logo from './logo.svg';
import { Home } from './pages/Home';
import './assets/styles/global.scss'
import { Route, Switch } from 'react-router';
import { CardDetails } from './cmps/CardCmps/CardDetails';
import { Board } from './pages/Board';
import { Navbar } from './cmps/Navbar';
import userService from './services/userService';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { connect } from 'react-redux';
import { updateBoard, updatePosition } from './store/actions/boardActions';
import { BoardHub } from './pages/BoardHub';
import { Login } from './pages/Login';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Notify } from './cmps/Notify';
import { Main } from './pages/Main';
import { AnalysisDashboard } from './pages/AnalysisDashboard';



class _App extends Component {

  componentDidMount() {
    userService.loginDefault()
    toast.configure()
  }

  
  onDragEnd = (result) => {

    const { destination, source, draggableId, type } = result

    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return    
    if (!draggableId) return

    if (type === 'card') {
      const startGroupIndex = this.props.board.groups.findIndex(group => group.id === source.droppableId)
      const endGroupIndex = this.props.board.groups.findIndex(group => group.id === destination.droppableId)

      // moving in the same group
      if (source.droppableId === destination.droppableId) {

        const currGroup = this.props.board.groups.find(group => group.id === source.droppableId)
        const currCard = currGroup.cards.find(card => card.id === draggableId)
        const newCardsGroup = Array.from(currGroup.cards)
        newCardsGroup.splice(source.index, 1)
        newCardsGroup.splice(destination.index, 0, currCard)
        const newGroup = { ...currGroup, cards: newCardsGroup }
        const newGroups = [...this.props.board.groups]
        newGroups[startGroupIndex] = newGroup
        const newBoard = { ...this.props.board, groups: newGroups }
        this.props.updatePosition(newBoard)
        // this.props.updateBoard(newBoard)
        return
      }

      // moving between groups
      if (source.droppableId !== destination.droppableId) {

        const destinationGroup = this.props.board.groups.find(group => group.id === destination.droppableId)
        const formerGroup = this.props.board.groups.find(group => group.id === source.droppableId)
        const currCard = formerGroup.cards.find(card => card.id === draggableId)
        const formerCardIndex = formerGroup.cards.findIndex(card => card.id === draggableId)
        const newCardsArray = Array.from(destinationGroup.cards)

        // time analysis
        const currCardTime = currCard.timeAnalysis
        if (currCardTime) {
          currCardTime.timeInGroupsMap[currCardTime.currGroup.groupId] =
            currCardTime.timeInGroupsMap[currCardTime.currGroup.groupId] + (Date.now() - currCardTime.currGroup.enteredAt) ||
            (Date.now() - currCardTime.currGroup.enteredAt)
          currCardTime.currGroup = {
            groupId: destinationGroup.id,
            enteredAt: Date.now()
          }
        }

        newCardsArray.splice(destination.index, 0, currCard)
        formerGroup.cards.splice(formerCardIndex, 1)

        const newGroups = [...this.props.board.groups]
        newGroups[startGroupIndex] = formerGroup
        newGroups[endGroupIndex].cards = newCardsArray

        const newBoard = { ...this.props.board, groups: newGroups }
        this.props.updatePosition(newBoard)
        // this.props.updateBoard(newBoard)
        return
      }
    }

    if (type === 'group') {

      const newGroupsOrder = Array.from(this.props.board.groups)
      const currGroup = this.props.board.groups.find(group => group.id === draggableId)
      newGroupsOrder.splice(source.index, 1)
      newGroupsOrder.splice(destination.index, 0, currGroup)

      const newBoard = {
        ...this.props.board,
        groups: newGroupsOrder
      }
      this.props.updatePosition(newBoard)
      // this.props.updateBoard(newBoard)
      return

    }
  }

  render() {
    const { style } = this.props
    return (

      (this.props.style)
        ? <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="app-bg" style={{backgroundImage: style.bgImg, backgroundPosition:'center'}}>
            <div className="App">
              <header className="App-header">
                <Navbar />
              </header>
              <main className="app-main">
              <Notify />
              <Switch>
                <Route path="/analysis/:id/" component={AnalysisDashboard} />
                <Route path="/board/:id/:cardId?" component={Board} />
                {/* <Route path="/board?/:id?/login" component={Login} /> */}
                <Route path="/login" component={Login} />
                <Route component={Home} path='/:view' />
                <Route component={Main} path='/' />
              </Switch>
              </main>
            </div>
          </div>
        </DragDropContext>
        : <div>loading</div>
    )
  }
}

const mapStateToProps = state => {
  return {
    board: state.boardReducer.board,
    style: state.boardReducer.style,
    filterBy: state.boardReducer.filterBy
  }
}

const mapDispatchToProps = {
  updateBoard,
  updatePosition
};

export const App = connect(mapStateToProps, mapDispatchToProps)(_App);

// <div className="groups-list-bg" 
// style={{
// backgroundImage: style.bgImg,
// color: style.fontClr
// }}
// >


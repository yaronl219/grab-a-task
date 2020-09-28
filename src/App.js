import React, { Component } from 'react';


import './assets/styles/global.scss'
import { Route, Switch } from 'react-router';

import { Board } from './pages/Board';
import { Navbar } from './cmps/Navbar';
import userService from './services/userService';
import { DragDropContext } from 'react-beautiful-dnd'
import { connect } from 'react-redux';
import { updateBoard, updatePosition, resetFilterBy } from './store/actions/boardActions';

// import { Login } from './pages/Login';
import {Main} from './pages/Main'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Notify } from './cmps/Notify';
import { Home } from './pages/Home';
import { BoardSelection } from './cmps/BoardSelector/BoardSelection';
import { AnalysisDashboard } from './pages/AnalysisDashboard';



class _App extends Component {

  componentDidMount() {
    userService.loginDefault()
    toast.configure()
  }

  onDragStart = () => {
    this.props.resetFilterBy(this.props.board._id)
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

  // getImgOrBg = ()=>{
  //   if (this.props.style.bgImg) return `backgroundImage: style.bgImg`
  //   else if (this.props.style.boardColor) return `backgroundColor:style.boardColor`
  // }

  // getStyle = () => {
  //       if (this.props.style.bgImg) return `style={{backgroundImage: style.bgImg, backgroundPosition:'center'}}`
  //       else if (this.props.style.boardColor) return `style{{backgroundColor:style.boardColor,backgroundPosition:'center' }}`
  // }



  render() {
    const { style } = this.props

    return (

      (this.props.style)
        ? <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
          <div className="app-bg"
            style={this.props.style.bgImg ? { backgroundImage: style.bgImg, backgroundPosition: 'center' } :
              { backgroundColor: style.boardColor, backgroundPosition: 'center' }}>
            <div className="App">
              <header className="App-header">
                <Route path="/" component={Navbar} />
              </header>
              <main className="app-main">
              <Notify />
              <Switch>
                <Route path="/analysis/:id/" component={AnalysisDashboard} />
                <Route path="/board/:id/:cardId?" component={Board} />
                <Route path="/board" component={BoardSelection} />
                {/* <Route path="/board?/:id?/login" component={Login} /> */}
                {/* <Route path="/login" component={Login} /> */}
                <Route component={Home} path='/:view' />
                <Route component={Main} path='/' />
                {/* <Route path="/login" component={Login} /> */}
                <Route component={Home} path='/' />
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
  updatePosition,
  resetFilterBy
};

export const App = connect(mapStateToProps, mapDispatchToProps)(_App);

// <div className="groups-list-bg" 
// style={{
// backgroundImage: style.bgImg,
// color: style.fontClr
// }}
// >


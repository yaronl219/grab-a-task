import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import React, { Component } from 'react'
import SwipeableViews from 'react-swipeable-views';
import { boardService } from '../services/boardService';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { BoardHub } from './BoardHub';


export class Home extends Component {

    state = {
        view: 0,
        boards: null,
        templates: null
    }

    async componentDidMount() {
        
        this.setViewFromParams()
        const boards = await boardService.query()
        this.setState({ boards })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.view !== this.props.match.params.view) {
            this.setViewFromParams()
        }
    }
    
    setViewFromParams = () => {
        const view = this.props.match.params.view
        
        if (view === 'templates') return this.setState({view:1})
        return this.setState({view:0})
    }

    onSelectBoard = (boardId) => {
        this.props.history.push(`/board/${boardId}`)
    }


    onSelectTemplate = (templateId) => {

    }

    setView = (idx ) => {
        if (!idx) {
            this.props.history.push('/board')
        } else {
            this.props.history.push('/templates')
        }
    }
   


    render() {
        return (
            <div>
                <BottomNavigation
                className="home-nav"
                    value={this.state.view}
                    onChange={(event, newValue) => {
                        this.setView(newValue);
                    }}
                    showLabels
                >
                    <BottomNavigationAction label="Boards" icon={<DashboardIcon />} />
                    <BottomNavigationAction label="Templates" icon={<DeveloperBoardIcon />} />
                </BottomNavigation>
                <SwipeableViews onSwitching={this.setView} index={this.state.view} containerStyle={{ height: '100vh' }}>
                    <BoardHub boards={this.state.boards} onSelect={this.onSelectBoard} header="Boards" />
                    <BoardHub boards={this.state.boards} header="Templates" />
                </SwipeableViews>
            </div>
        )
    }
}

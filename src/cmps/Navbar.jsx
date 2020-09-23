// This contains link to boards (project view) and user details

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { AddNewBoard } from './BoardHeader/AddNewBoard'

import snorelax from '../assets/icons/snorelax.png'
import logo from '../assets/icons/opus2.png'

export class Navbar extends Component {

    state = {
        isNewBoardModalShown: false
    }

    toggleModal=()=>{
        this.setState({ isNewBoardModalShown: !this.state.isNewBoardModalShown })   
    }

    onCloseModal = () => {
        this.setState({ isNewBoardModalShown: false })
    }

    render() {
        return (
            <div className="navbar-container">
                <div className="navbar-left-container">
                    <div className="board-header-btn left"><NavLink to='main-url'><span className="material-icons">home</span></NavLink></div>
                    <div className="board-header-btn left"><NavLink to='/board'><span className="material-icons">view_list</span><h4 className="boards-text">Boards</h4></NavLink></div>
                </div>

                    <div className="header-logo"><img src={snorelax} alt="" /><img src={logo} alt="" /></div>

                <div className="navbar-right-container">
                    <div className="board-header-btn right" onClick={this.toggleModal}><span className="material-icons">add</span></div>
                    {this.state.isNewBoardModalShown && <AddNewBoard onCloseModal={this.onCloseModal}/> }
                    <div className="board-header-btn right"><NavLink to='/login'><h4 className="login-text">Login</h4></NavLink></div>

                </div>
            </div>
        )
    }
}

// in the Login NavLink will be prop from store if the user is logged in it will
// show its name initials
// This contains link to boards (project view) and user details

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { AddNewBoard } from './BoardHeader/AddNewBoard'

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
                    <NavLink to='main-url'>Home</NavLink>
                    <NavLink to='/board'>Boards</NavLink>
                </div>
                <div className="navbar-right-container">
                    <button onClick={ this.toggleModal}>+</button>
                    {this.state.isNewBoardModalShown && <AddNewBoard onCloseModal={this.onCloseModal}/> }
                    <NavLink to='/board'>Login</NavLink>
                </div>
            </div>
        )
    }
}

// in the Login NavLink will be prop from store if the user is logged in it will
// show its name initials
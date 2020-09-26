// This contains link to boards (project view) and user details

import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { AddNewBoard } from './BoardHeader/AddNewBoard'

import snorelax from '../assets/icons/snorelax.png'
import logo from '../assets/icons/opus2.png'

import logoFutura from '../assets/icons/newLogoFutura.png'
import logoHel from '../assets/icons/newLogoHel.png'
import { connect } from 'react-redux'



export class _Navbar extends Component {

    state = {
        isNewBoardModalShown: false
    }

    componentDidMount() {
        console.log(this.props);
    }

    toggleModal = () => {
        this.setState({ isNewBoardModalShown: !this.state.isNewBoardModalShown })
    }

    onCloseModal = () => {
        this.setState({ isNewBoardModalShown: false })
    }

    showLove = () => {
        alert('Snorelax Loves you 💤🌷')
    }

    redirectPath = (id) => {
        this.props.history.replace(`/`)
        this.props.history.replace(`/board/${id}`)
        this.onCloseModal()
    }
 
    render() {
        return (
            <div className="navbar-container">
                <div className="navbar-left-container">
                    <div className="board-header-btn left"><NavLink to='/'><span className="material-icons">home</span></NavLink></div>
                    <div className="board-header-btn left"><NavLink to='/board'><span className="material-icons">view_list</span><h4 className="boards-text">Boards</h4></NavLink></div>
                </div>
 
                <div onClick={this.showLove} style={{ cursor: "pointer" }} className="header-logo"><img src={logoFutura} alt="best logo ever" /></div>

                <div className="navbar-right-container">
                    <div className="board-header-btn right" onClick={this.toggleModal}><span className="material-icons">add</span></div>
                    {this.state.isNewBoardModalShown && <AddNewBoard onCloseModal={this.onCloseModal} redirectPath={this.redirectPath}/>}
                    <div className="board-header-btn login right"><NavLink to='/login'><h4 className="login-text">Login</h4></NavLink></div>

                </div>
            </div>
        )
    }
}

export const Navbar = connect(withRouter)(_Navbar)


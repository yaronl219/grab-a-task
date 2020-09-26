// This contains link to boards (project view) and user details

import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { AddNewBoard } from './BoardHeader/AddNewBoard'

import logoFutura from '../assets/icons/newLogoFutura.png'

import { connect } from 'react-redux'
import { LoginDrawer } from './LoginDrawer'


export class _Navbar extends Component {

    state = {
        isNewBoardModalShown: false,
        isLoginDrawerShown: false
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

    showLoginDrawer = (ev) => {
        ev.stopPropagation()
        ev.nativeEvent.stopImmediatePropagation();
        this.setState({ isLoginDrawerShown: true })
    }

    hideLoginDrawer= (ev) =>{
        ev.stopPropagation()
        this.setState({ isLoginDrawerShown: false })
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

                    {/* <div className="board-header-btn login right"><NavLink to='/login'><h4 className="login-text">Login</h4></NavLink></div> */}
                    <div className="board-header-btn login right" onClick={this.showLoginDrawer}><h4 className="login-text">Login</h4></div>
                    <LoginDrawer isShowing={this.state.isLoginDrawerShown} hideLoginDrawer={this.hideLoginDrawer}/>
                </div>
            </div>
        )
    }
}
export const Navbar = connect(withRouter)(_Navbar)


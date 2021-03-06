// This contains link to boards (project view) and user details

import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { AddNewBoard } from './BoardHeader/AddNewBoard'
import logoFutura from '../assets/icons/newLogoFutura.png'

import { connect } from 'react-redux'
import { LoginDrawer } from './LoginDrawer'
import { loadUser, logout } from '../store/actions/userActions'
import { MemberPreview } from './BoardHeader/MemberPreview'
import { Dialog, IconButton } from '@material-ui/core'
import { Users } from './Users/UsersMain'

// import { MemberPreview } from './BoardHeader/MemberPreview'
import userService from '../services/userService'
import { CloseOutlined } from '@material-ui/icons'


export class _Navbar extends Component {

    state = {
        isNewBoardModalShown: false,
        isLoginDrawerShown: false,
        isUserDetailsOpen: false,
        loggedInUser: null
    }


    toggleModal = () => {
        this.setState({ isNewBoardModalShown: !this.state.isNewBoardModalShown })
    }

    onCloseModal = () => {
        this.setState({ isNewBoardModalShown: false })
    } 

    componentDidMount() {
        this.setState({ loggedInUser: userService.getLoggedInUser() })
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

    hideLoginDrawer = (ev) => {
        if (ev) ev.stopPropagation()
        this.setState({ isLoginDrawerShown: false })
    }

    onOpenUserDetails = () => {
        console.log('open')
        this.setState({ isUserDetailsOpen: true })
    }

    onCloseUserDetails = () => {
        this.setState({ isUserDetailsOpen: false })
    }

    onLogout = async (ev) => {
        ev.stopPropagation()
        await this.props.logout()
        this.setState({ isUserDetailsOpen: false })
    }

    render() {        
        return (
            <React.Fragment>
                <Dialog open={this.state.isUserDetailsOpen} onClose={this.onCloseUserDetails} onBackdropClick={this.onCloseUserDetails}>
                    <div className="user-details-preview-header">
                        <div></div>
                        <div><h6>User Details</h6></div>
                        <IconButton onClick={this.onCloseUserDetails}>
                            <CloseOutlined />
                        </IconButton>
                    </div>
                    <Users onCloseUserDetails={this.onCloseUserDetails} onLogout={this.onLogout}/>
                </Dialog>
                <Dialog open={this.state.isNewBoardModalShown} onClose={this.onCloseModal} onBackdropClick={this.onCloseModal}>
                    <AddNewBoard onCloseModal={this.onCloseModal} redirectPath={this.redirectPath} />
                </Dialog>
                <div className="navbar-container">
                    <div className="navbar-left-container">
                        <div className="board-header-btn left"><NavLink to='/'><span className="material-icons">home</span></NavLink></div>
                        <div className="board-header-btn left"><NavLink to='/board'><span className="material-icons">view_list</span><h4 className="boards-text">Boards</h4></NavLink></div>
                    </div>

                    <div className="header-logo"><img src={logoFutura} alt="best logo ever" /></div>

                    <div className="navbar-right-container">
                        <div className="board-header-btn right" onClick={this.toggleModal}><span className="material-icons">add</span></div>

                        {(!this.props.loggedInUser) ? <div className="board-header-btn login right" onClick={this.showLoginDrawer}><h4 className="login-text">Login</h4></div> :''}
                        {(this.props.loggedInUser) ? <div onClick={this.onOpenUserDetails} className="member-preview-header-container"><MemberPreview name={this.props.loggedInUser.fullName} imgUrl={this.props.loggedInUser.imgUrl} /></div> : <React.Fragment />}

                        <LoginDrawer isShowing={this.state.isLoginDrawerShown} hideLoginDrawer={this.hideLoginDrawer} />

                    </div>
                </div>
            </React.Fragment>
        )
    }
}


// export const Navbar = connect(withRouter)(_Navbar)




const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser
    }
}

const mapDispatchToProps = {
    loadUser,
    logout
}

export const Navbar = connect(mapStateToProps, mapDispatchToProps)(_Navbar);



// {
//     (!this.props.loggedInUser) ? <div className="board-header-btn login right" onClick={this.showLoginDrawer}><h4 className="login-text">Login</h4></div> :
//     <MemberPreview img={this.props.loggedInUser.imgUrl} name={this.props.loggedInUser.fullName} />
// }
// <LoginDrawer isShowing={this.state.isLoginDrawerShown} hideLoginDrawer={this.hideLoginDrawer} />

{/* {this.state.isNewBoardModalShown && <AddNewBoard onCloseModal={this.onCloseModal} redirectPath={this.redirectPath} />} */ }

{/* <div className="board-header-btn login right"><NavLink to='/login'><h4 className="login-text">Login</h4></NavLink></div> */ }
{/* <div className="board-header-btn login right" onClick={this.showLoginDrawer}><h4 className="login-text">{(!this.state.loggedInUser || this.state.loggedInUser._id === 'u900') ? 'Login' : 'Logout'}</h4></div>
                        <LoginDrawer isShowing={this.state.isLoginDrawerShown} hideLoginDrawer={this.hideLoginDrawer} /> */}

{/* {(!this.props.loggedInUser) ? <div className="board-header-btn login right" onClick={this.showLoginDrawer}><h4 className="login-text">Login</h4></div> :
                            <MemberPreview img={this.props.loggedInUser.imgUrl} name={this.props.loggedInUser.fullName} />
                        } */}
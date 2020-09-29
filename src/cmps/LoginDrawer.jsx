import React, { Component } from 'react'
import { Drawer, ClickAwayListener, CircularProgress } from '@material-ui/core'
import logo from '../assets/icons/favicon.png'

import { Formik, Field, Form } from 'formik';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { loadUser, signUser } from '../store/actions/userActions';



export class _LoginDrawer extends Component {


    state = {
        loginOrSignup: 'login',
        credentials:{},
        isLoading: false,
        isWelcomeShown: false,
        isErrorShown: false
    }

    handleChange=(ev)=>{
        const target = ev.target
        const credentials = { ...this.state.credentials, [target.name]: target.value}
        this.setState({ credentials }, ()=> console.log(this.state.credentials))
    }

    setSignup=()=>{
        this.setState({ loginOrSignup: 'signup' })
    }

    setLogin=()=>{
        this.setState({ loginOrSignup: 'login' })
    }

    onSubmit = async (ev)=>{
        ev.preventDefault()
        this.setState({ isErrorShown: false })

        // login verification
        if (this.state.loginOrSignup === 'login') {
                this.setState({ isLoading: true }, async ()=> {
                        const user = await this.props.loadUser(this.state.credentials)
                        if (!this.props.loggedInUser){
                            this.setState({ isErrorShown: true, isLoading: false})
                            return
                        }
                        this.setState({ isWelcomeShown: true, isLoading: false }, () => {
                            setTimeout(() => {
                                this.props.hideLoginDrawer()
                                setTimeout(() => { this.setState({ isWelcomeShown: false }) }, 500)
                            }, 1700)
                        })
                })
        } else if (this.state.loginOrSignup === 'signup'){
            // signup verification
            const name = this.state.credentials.name
            if (!name || name.trim().indexOf(' ') === -1) { 
                this.setState({ isErrorShown: true })
                return
            }
            this.setState({ isLoading: true }, async () => {
                    await this.props.signUser(this.state.credentials)
                    this.setState({ isWelcomeShown: true, isLoading: false }, () => {
                        setTimeout(() => {
                            this.props.hideLoginDrawer()
                            setTimeout(() => { this.setState({ isWelcomeShown: false }) }, 500)
                        }, 1700)
                    })
            })
        }
    }

    render() {
        return (
            <ClickAwayListener onClickAway={ this.props.hideLoginDrawer }>
                <div className="login-container">
                    <Drawer 
                        anchor="right"
                        open={this.props.isShowing}
                        BackdropProps={{ showBackdrop: true }}
                        variant={"persistent"}>
                            <div className="login-form-container">
                                <img className="login-logo" src={logo} alt="" />
                                <h4>Welcome to Opus</h4>

                            {(this.state.isLoading) ? <div className="circular-progress-container" > <CircularProgress /></div> : ''}
                            {(this.state.isWelcomeShown) ?  <div><h4>Your'e now logged in :)</h4></div> : ''}
                            {(this.state.isErrorShown) ? <div><h5>Something went wrong, try again?</h5></div> : ''}

                            {/* login form */}
                            {this.state.loginOrSignup === 'login' && !this.state.isLoading && !this.state.isWelcomeShown &&
                                <Formik 
                                    initialValues={{ email: '', password: '' }}
                                    validate={values => {
                                        const errors = {};
                                        if (!values.email) { errors.email = 'Required'; } 
                                        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) 
                                            { errors.email = 'Invalid email address'; } return errors; }} onSubmit={ this.onSubmit }>
                                    {({handleSubmit,isSubmitting,}) => (
                                        <form className="inner-form-container" onSubmit={this.onSubmit}>
                                            <input type="email" name="email" onChange={this.handleChange} placeholder="Email address" autoComplete="off"/>
                                            <input type="password" name="password" onChange={this.handleChange} placeholder="Password" autoComplete="off" />
                                            <button type="submit" disabled={isSubmitting}>Log in</button>
                                        </form>
                                        )}
                                </Formik>
                            }

                            {/* sign up form */}
                            {this.state.loginOrSignup === 'signup' && !this.state.isLoading && !this.state.isWelcomeShown &&
                                <Formik 
                                    initialValues={{ email: '', password: '' }}
                                    validate={values => {
                                        const errors = {};
                                        if (!values.email) { errors.email = 'Required'; } 
                                        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) 
                                            { errors.email = 'Invalid email address'; } return errors; }} onSubmit={ this.onSubmit }>
                                    {({handleSubmit,isSubmitting,}) => (
                                        <form className="inner-form-container" onSubmit={this.onSubmit}>
                                            <input type="text" name="name" onChange={this.handleChange} placeholder="Full name" autoComplete="off"/>
                                            <input type="email" name="email" onChange={this.handleChange} placeholder="Email address" autoComplete="off"/>
                                            <input type="password" name="password" onChange={this.handleChange} placeholder="Password" autoComplete="off" />
                                            <button type="submit" disabled={isSubmitting}>Sign Up</button>
                                        </form>
                                        )}
                                </Formik>
                            }
                            </div>
                            
                        {(this.state.loginOrSignup === 'login') ? <button className="signup-btn" onClick={this.setSignup}>Sign up</button>:
                            <button className="signup-btn" onClick={this.setLogin}>Log in</button>
                        }
                    </Drawer>
                </div>
            </ClickAwayListener>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser
    }
}

const mapDispatchToProps = {
        loadUser,
        signUser
}

export const LoginDrawer = connect(mapStateToProps, mapDispatchToProps)(_LoginDrawer);
import React, { Component } from 'react'
import { Drawer, ClickAwayListener } from '@material-ui/core'
import logo from '../assets/icons/favicon.png'

import { Formik, Field, Form } from 'formik';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { loadUser } from '../store/actions/userActions';


export class _LoginDrawer extends Component {


    state = {
        loginOrSignup: 'login',
        credentials:{}
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.props.loggedInUser)
        console.log(prevProps.loggedInUser)
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
        console.log(this.state.credentials);
        this.props.loadUser(this.state.credentials)
    }

    render() {
        console.log(this.props.loggedInUser)

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

                            {this.state.loginOrSignup === 'login' &&
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

                            {this.state.loginOrSignup === 'signup' &&
                                <Formik 
                                    initialValues={{ email: '', password: '' }}
                                    validate={values => {
                                        const errors = {};
                                        if (!values.email) { errors.email = 'Required'; } 
                                        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) 
                                            { errors.email = 'Invalid email address'; } return errors; }} onSubmit={ this.onSubmit }>
                                    {({handleSubmit,isSubmitting,}) => (
                                        <form className="inner-form-container" onSubmit={this.onSubmit}>
                                            <input type="text" name="name" onChange={this.handleChange} placeholder="Full name" autoComplete={false}/>
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
        loadUser
}

export const LoginDrawer = connect(mapStateToProps, mapDispatchToProps)(_LoginDrawer);
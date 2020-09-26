import React, { Component } from 'react'
import { Drawer, ClickAwayListener } from '@material-ui/core'
import logo from '../assets/icons/favicon.png'

import { Formik, Field, Form } from 'formik';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';



export class LoginDrawer extends Component {


    state = {
        loginOrSignup: 'login',
        credentials:{}

    }

    handleChange=(ev)=>{
        const target = ev.target
        const credentials = { ...this.state.credentials, [target.name]: target.value}
        this.setState({ credentials }, ()=> console.log(this.state.credentials))
    }


    setSignup=()=>{
        this.setState({ loginOrSignup: 'signup' })
    }

    onSubmit=(ev)=>{
        ev.preventDefault()
        console.log(this.state.credentials);
        console.log('yayy');
        
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
                                <Formik 
                                    initialValues={{ email: '', password: '' }}
                                    validate={values => {
                                        const errors = {};
                                        if (!values.email) { errors.email = 'Required'; } 
                                        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) 
                                            { errors.email = 'Invalid email address'; } return errors; }} onSubmit={ this.onSubmit }>
                                    {({handleSubmit,isSubmitting,}) => (
                                        <form className="inner-form-container" onSubmit={handleSubmit}>
                                            <input type="email" name="email" onChange={this.handleChange} placeholder="Email address" autoComplete="off"/>
                                            <input type="password" name="password" onChange={this.handleChange} placeholder="Password" autoComplete="off" />
                                                <button type="submit" disabled={isSubmitting}>Log in</button>
                                        </form>
                                        )}
                                </Formik>
                            </div>
                        <button className="signup-btn" onClick={this.setSignup} >Sign up</button>
                    </Drawer>
                </div>
            </ClickAwayListener>

        )
    }
}


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
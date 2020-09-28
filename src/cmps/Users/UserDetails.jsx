import { Avatar, CircularProgress } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import userService from '../../services/userService'
import { updateUser } from '../../store/actions/userActions'
import { CardImgUpload } from '../CardCmps/CardImgUpload'

class _UserDetails extends Component {

    state = {
        username: '',
        fullName: '',
        imgUrl: '',
        id: null,
        isUploadZoneOpen: false,
        isUploading: false
    }

    componentDidMount() {
        this.getUserDetailsFromProps()
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.loggedInUser !== this.props.loggedInUser) {
            this.getUserDetailsFromProps()
        }
    }

    setUploading = () => {
        return new Promise(res => {
            this.setState({ isUploading: true }, () => res(true))
        })
    }

    onAddImage = async (file) => {
        await this.setUploading()
        const user = await userService.getById(this.state.id)
        user.imgUrl = file
        
        await this.props.updateUser(user)
        this.setState({imgUrl:file,isUploading:false})
    }


    toggleUploadDropzone = () => {
        if (this.state.isUploadZoneOpen) return this.setState({ isUploadZoneOpen: false })
        return this.setState({ isUploadZoneOpen: true })
    }
    getUserDetailsFromProps = () => {
        const user = this.props.loggedInUser
        if (!user) return
        if (user.imgUrl) this.testImage(user.imgUrl, this.setImgResult)
        this.setState({ username: user.userName, fullName: user.fullName, id: user._id })
    }


    testImage = (url, callback, timeout = 5000) => {

        var timedOut = false, timer;
        var img = new Image();
        img.onerror = img.onabort = function () {
            if (!timedOut) {
                clearTimeout(timer);
                callback(url, "error");
            }
        };
        img.onload = function () {
            if (!timedOut) {
                clearTimeout(timer);
                callback(url, "success");
            }
        };
        img.src = url;
        timer = setTimeout(function () {
            timedOut = true;
            // reset .src to invalid URL so it stops previous
            // loading, but doesn't trigger new load
            img.src = "//!!!!/test.jpg";
            callback(url, "timeout");
        }, timeout);
    }


    getInitials(name) {
        if (!name) return
        const newName = name.split(' ')
        const firstLetter = newName[0].charAt(0).toUpperCase()
        const secondLetter = newName[1].charAt(0).toUpperCase()
        const initials = firstLetter + secondLetter
        return initials
    }

    setImgResult = (url, res) => {
        if (res === 'success') this.setState({ imgUrl: url })
    }

    render() {
        if (!this.state.username) return <React.Fragment />
        return (
            <div className="user-profile-container">
                <div className="user-profile">
                    <div className="user-img-container">
                        <CardImgUpload onAddImage={this.onAddImage} setUploading={this.setUploading} toggleOpen={this.toggleUploadDropzone} isOpen={this.state.isUploadZoneOpen} />
                        <div className="user-img">
                            {(this.state.isUploading) ? <CircularProgress style={{width:'144px',height:'144px'}}/> : (!this.state.imgUrl) ? <Avatar onClick={this.toggleUploadDropzone} className="user-details-avatar" style={{ width: '144px', height: '144px' }}>{this.getInitials(this.state.fullName)}</Avatar> : <img src={this.state.imgUrl} onClick={this.toggleUploadDropzone} alt="User" />}
                        </div>
                    </div>
                    <div className="user-details-container">
                        <h5>{this.state.username}</h5>
                        <div>{this.state.fullName}</div>
                    </div>
                </div>
            </div>

        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.userReducer.user
    };
};
const mapDispatchToProps = {
    updateUser

};

export const UserDetails = connect(mapStateToProps, mapDispatchToProps)(_UserDetails);

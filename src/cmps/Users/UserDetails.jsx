import { CircularProgress } from '@material-ui/core'
import React, { Component } from 'react'
import { CardImgUpload } from '../CardCmps/CardImgUpload'

export class UserDetails extends Component {

    state = {
        username: '',
        fullName: '',
        imgUrl: '',
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
            this.setState({isUploading:true},() => res(true))
        })
    }

    onAddImage = (file) => {
        console.log(file)
    }
    toggleUploadDropzone = () => {
        if (this.state.isUploadZoneOpen) return this.setState({isUploadZoneOpen:false})
        return this.setState({isUploadZoneOpen:true})
    }
    getUserDetailsFromProps = () => {
        const user = this.props.loggedInUser
        
        if (!user) return
        this.setState({ username: user.username, fullName: user.fullName, imgUrl: user.imgUrl })
    }

    render() {
        if (!this.state.username) return <React.Fragment />
        return (
            <div className="user-profile-container">
                <div className="user-profile">
                    <div className="user-img-container">
                    <CardImgUpload onAddImage={this.onAddImage} setUploading={this.setUploading} toggleOpen={this.toggleUploadDropzone} isOpen={this.state.isUploadZoneOpen} />
                        <div className="user-img">
                            {(this.state.isLoading) ? <CircularProgress /> : <img src={this.state.imgUrl} onClick={this.toggleUploadDropzone} alt="User" />}
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

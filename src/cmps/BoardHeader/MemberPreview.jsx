
import { Tooltip } from '@material-ui/core'
import React, { Component } from 'react'

export class MemberPreview extends Component {

    state = {
        imgUrl: null
    }

    componentDidMount() {
        this.testImage(this.props.imgUrl, this.setImgResult)
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

    getStyle = () => {
        if (this.state.imgUrl) return { backgroundImage: `url(${this.props.imgUrl})` }
        return {}
    }

    getName = () => {
        if (this.props.name) return this.props.name
        return ''
    }

    render() {

        return (
            <Tooltip title={this.getName()}>
                <div className="member-preview" style={this.getStyle()}>
                    {(this.state.imgUrl) ? <React.Fragment /> : this.getInitials(this.props.name)}
                </div>
            </Tooltip>
        )
    }
}

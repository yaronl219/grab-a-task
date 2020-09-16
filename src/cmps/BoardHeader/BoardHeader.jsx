// this contains:
// Board name
// Board Members
// Filter (search)
// Link to Statistics
// Menu hamburger

import React, { Component } from 'react'

export class BoardHeader extends Component {
    render() {
        console.log(this.props)
        
        return (
            <div className="boards-header-container">
                <h2></h2>
               This is the board header
            </div>
        )
    }
}

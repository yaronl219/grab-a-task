import React, { Component } from 'react'

export default class SideArchive extends Component {
    render() {
        return (
            <div className="archive">
                <button onClick={this.props.onBackToMenu}>{'<'}</button>
                this is archive
            </div>
        )
    }
}

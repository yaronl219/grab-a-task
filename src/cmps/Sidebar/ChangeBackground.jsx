import React, { Component } from 'react'

export class ChangeBackground extends Component {
    render() {
        return (
            <div className="about-board">
                <button onClick={this.props.onBackToMenu}>{'<'}</button>
                <h4>Change Background</h4>
                <p>
                    blah blah
                </p>
            </div>
        )
    }
}

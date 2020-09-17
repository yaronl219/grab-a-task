import React, { Component } from 'react'

export class Label extends Component {


    render() {
        return (
            <div className="label-inner-container"
                onClick={() => this.props.onFilterByLabel(this.props.id)}>
                <div className={`label ${this.props.color}`}></div>
                <p>{this.props.name}</p>
            </div>
        )
    }
}

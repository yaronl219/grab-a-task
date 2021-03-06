import React, { Component } from 'react'
import CheckIcon from '@material-ui/icons/Check';

export class Label extends Component {

    render() {
        const { isChecked } = this.props
        return (
            <div className="label-inner-container"
                onClick={() => this.props.onFilterByLabel(this.props.id)}>
                <div className={`label ${this.props.color}`}></div>  
                {this.props.name ? <p>{this.props.name}</p> : <p>Deafult</p>}
                {isChecked && <div><CheckIcon /></div>}
            </div>
        )
    }
}
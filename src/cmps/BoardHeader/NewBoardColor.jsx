
import React, { Component } from 'react'

export class NewBoardColor extends Component {
    render() {  
        console.log(this.props.color);
              
        return (
            <div className={`new-board-color ${this.props.isSelected ? 'colorSelected' : ''}`} 
            style={{ backgroundColor: `${this.props.color}` }}
                onClick={()=>this.props.onSetColor(this.props.color) }
            ></div>
        )
    }
}


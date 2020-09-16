import React, { Component } from 'react'

export class CardPreview extends Component {

    state = {
        isEditing: false
    }
    componentDidMount() {
       console.log(this.props)

    }
    
    onSetEditing = () => {
        this.setState({isEditing:true})
    }

    render() {
        return (
            <div>
                <div className="card-preview-header">
                {this.props.card.title}
                </div>
                <div className="card-preview-edit-btn">Edit</div>
            </div>
        )
    }
}

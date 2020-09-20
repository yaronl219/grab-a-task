import React, { Component } from 'react'
import SubjectIcon from '@material-ui/icons/Subject';

export class CardDescription extends Component {

    state = {
        description: '',
        isEditing: false
    }


    componentDidMount() {
        this.setDescriptionFromProps()
    }

    setDescriptionFromProps = () => {
        let description = this.props.description
        if (!description) description = ''
        this.setState({ description })
    }

    onChange = (ev) => {
        const description = ev.target.value
        this.setState({ description })
    }

    setEditing = () => {
        this.setState({ isEditing: true })
    }

    setNotEditing = () => {
        this.setState({ isEditing: false })
    }

    onSave = () => {
        this.props.onUpdateDesc(this.state.description)
        this.setNotEditing()
    }

    getDescriptionTxt = () => {
        if (!this.state.description) return 'Add a more detailed description…'
        return this.state.description
    }
    getIsEditing = () => {
        if (!this.state.isEditing) return (
            <pre className="item-details-description-text-display" onClick={this.setEditing}>{this.getDescriptionTxt()}</pre>
        )
        return (
            <div className='item-details-description-text-edit-container'>
                <textarea value={this.state.description} autoFocus onChange={this.onChange} onBlur={this.onSave} placeholder="Enter a more details description here..." />
                <button onClick={this.onSave} className="save-btn">Save</button>
            </div>
        )
    }

    // 
    render() {
        // if (!this.state.isReady) return <div>Loading...</div>
        return (
            <div className="item-details-description">
                {/* <input value={this.state.description} onChange={this.onChange} placeholder="Enter a more details description here..." /> */}
                <SubjectIcon />
                <div>
                <h3>Description</h3>
                {this.getIsEditing()}
                </div>
            </div>
        )
    }
}

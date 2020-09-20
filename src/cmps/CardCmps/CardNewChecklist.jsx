import { Button } from '@material-ui/core'
import React, { Component } from 'react'
import { utils } from '../../services/utils'

export class CardNewChecklist extends Component {

    state = {
        isEditing: false,
        txtValue: ''
    }

    setEditing = () => {
        this.setState({ isEditing: true })
    }
    setNotEditing = () => {
        this.setState({ isEditing: false })
    }
    onChange = (ev) => {
        this.setState({ txtValue: ev.target.value })
    }
    onSubmit = async(ev) => {
        ev.preventDefault()
        if (!this.state.txtValue) return this.setNotEditing()
        const checklist = {
                id: utils.makeId(),
                "title": this.state.txtValue,
                "todos": []             
        }
        await this.props.addActivity(`added the checklist ${this.state.txtValue}`)
        this.props.onUpdate(checklist)
        this.setState({txtValue:''})
        this.setNotEditing()
    }
    
    
    getNewChecklistDisplay = () => {
        if (this.state.isEditing) return (
            <form className="new-checklist-form" onBlur={this.setNotEditing}  onSubmit={this.onSubmit} > 
                <input type="text" autoFocus value={this.state.txtValue} onChange={this.onChange} />
                <button className="save-btn" type="submit">Save</button>
            </form>
        )
        return (
            <Button onClick={this.setEditing}>New Checklist</Button>
        )
    }


    render() {
        return (
            <div>
                {this.getNewChecklistDisplay()}
            </div>
        )
    }
}
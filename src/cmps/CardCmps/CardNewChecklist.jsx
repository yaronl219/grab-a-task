import { Button } from '@material-ui/core'
import React, { Component } from 'react'
import { utils } from '../../services/utils'
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';

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
        // const activity =  this.props.addActivity(`added the checklist ${this.state.txtValue}`)
        const activity = `added the checklist ${this.state.txtValue}`
        this.props.onUpdate(checklist,activity)
        this.setState({txtValue:''})
        this.setNotEditing()
    }
    
    
    getNewChecklistDisplay = () => {
        if (this.state.isEditing) return (
            <form className="new-checklist-form" onBlur={this.setNotEditing}  onSubmit={this.onSubmit} > 
                <input type="text" autoFocus value={this.state.txtValue} onChange={this.onChange} />
                <button className="save-btn" onMouseDown={this.onSubmit}>Save</button>
            </form>
        )
        return (
            <Button onClick={this.setEditing}><CheckBoxOutlinedIcon /><span>New Checklist</span></Button>
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

import { Accordion, AccordionDetails, AccordionSummary, Button } from '@material-ui/core'
import React, { Component } from 'react'


export class CardAddComment extends Component {

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


    onSubmit = (ev) => {
        ev.preventDefault()
        if (this.state.txtValue) {
            this.props.onAddComment(this.state.txtValue)
            this.setNotEditing()
            this.setState({txtValue:''})
        }
    }

    onBlur = () => {
        if (!this.state.txtValue) return this.setNotEditing()
        
    }

    onSave = (ev) => {
        this.setNotEditing()
        this.onSubmit(ev)
    }

    getNewCommentDisplay = () => {
        if (this.state.isEditing) return (
            <div className="add-comment-editing-container">
                <form onBlur={this.onBlur} onSubmit={this.onSubmit}>
                    <input className="add-comment-input" type="text" placeholer="Write a comment..." autoFocus value={this.state.txtValue} onChange={this.onChange} />
                </form>
            </div>
        )
        return (
            <div className="add-comment-editing-closed">Write a comment...</div>
        )
    }


    render() {
        return (
            <div className="editing-section-container" >
            <Accordion expanded={this.state.isEditing} onClick={this.setEditing}  classes={{expanded:'editing-container-expanded', root:'editing-container-collapsed'}}>
                <AccordionSummary
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                {this.getNewCommentDisplay()}
                </AccordionSummary>
                <AccordionDetails>
          <div>
          <button className="save-btn" disabled={!this.state.txtValue.length} onClick={this.onSave}>Save</button>
          </div>
        </AccordionDetails>
            </Accordion>
        </div>
        )
    }
}



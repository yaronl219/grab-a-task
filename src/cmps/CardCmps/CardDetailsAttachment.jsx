import React, { Component } from 'react'
import * as timeago from 'timeago.js';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import {  IconButton } from '@material-ui/core';

export class CardDetailsAttachment extends Component {
    state = {
        isEditing: false,
        att: null,
        title: ''
    }

    componentDidMount() {
        
        this.updateAttFromProps()
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.attachment !== prevProps.attachment) {
            this.updateAttFromProps()
        }
        if (this.state.att !== prevState.att) {
            
        }
    }
    
    updateAttFromProps = () => {
        const att = {...this.props.attachment}
        const title = this.props.attachment.title 
        
        this.setState({ att, title })
    }

    setEditing = (bool) => {
        if (bool) return this.setState({isEditing:true})
        return this.setState({isEditing:false})
    }

    onChange = (ev) => {
        this.setState({title:ev.target.value})
    }

    onRemove = (ev) => {
        // if the update function receives a blank title - it removes the item
        this.setState({title:''},() => {
            this.updateCard().then(() => {
                this.setState({att:null})
            })
        }
            )

    }

    onSubmit = (ev) =>{
        ev.preventDefault()
        this.updateCard()
    }

    updateCard = () => {
        return new Promise(resolve => {

            const att = {...this.state.att}
            att.title = this.state.title
            // console.log()
            this.props.onUpdate(att)
            this.setEditing(false)
            resolve()
        })
        
    }

    render() {
        
        const att = this.state.att
        if (!att) return <React.Fragment />
        return (
            <div className="card-attachment">
                <div className="att-image" style={{ backgroundImage: `url(${att.src})` }} />
                <div className="att-details-container">
                    <div className="att-title">
                        {(this.state.isEditing) ? 
                        <form onSubmit={this.onSubmit} onBlur={() => {this.setEditing(false)}}><input autoFocus onChange={this.onChange} type="text" value={this.state.title} required /></form> 
                        :<h5 onClick={() => {this.setEditing(true)}}>{this.state.title}</h5> }
                    </div>
                    <div className="att-date-added">
                        {timeago.format(att.createdAt)}
                    </div>
                </div>
                <div className="att-remove">
                    <IconButton onClick={this.onRemove}>
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

export class NewItem extends Component {

    state = {
        isEditing: false,
        txtValue: ''
    }

    onChange = (ev) => {
        const txtValue = ev.target.value
        this.setState({ txtValue })
    }

    onKeyPress = (ev) => {
        // console.log(ev.key)
        if (ev.key === 'Enter') this.onSubmit(ev)
    }
    setEditing = () => {
        this.setState({ isEditing: true })
    }

    setNotEditing = () => {
        this.setState({ isEditing: false })
    }

    getIsEditing = () => {
        if (!this.state.isEditing) return (
            <div className="new-item-btn" onClick={this.setEditing}><AddIcon style={{ fontSize: 14 }} />{this.props.addItemTxt}</div>
        )
        
        return (

            <div className="new-item-form">
                <form  onKeyDown={this.onKeyPress} onBlur={this.setNotEditing} onSubmit={this.onSubmit} >
                    <textarea placeholder={this.props.placeHolderTxt} autoFocus type="text" onChange={this.onChange} value={this.state.txtValue} />
                    <div className="save-btn-container">
                        <button className="save-btn" onMouseDown={this.onSubmit}>{this.props.addBtnTxt}</button>
                        <CloseIcon onClick={this.setNotEditing} />
                    </div>
                </form>
            </div>
        )
    }


    onSubmit = async(ev) => {
        ev.preventDefault()
        if (!this.state.txtValue) return
        await this.props.onAdd(this.state.txtValue)
        const isEditing = false
        const txtValue = ''
        this.setState({ isEditing, txtValue })
    }

    render() {
        return (
            <div className="new-item-container">
                {this.getIsEditing()}
            </div>
        )
    }
}

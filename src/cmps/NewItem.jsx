import React, { Component } from 'react'

export class NewItem extends Component {

    state = {
        isEditing: false,
        txtValue: ''
    }

    componentDidMount() {

    }
    
    onChange = (ev) => {
        
        const txtValue = ev.target.value
        this.setState({txtValue})
    }


    setEditing = () => {
        this.setState({isEditing:true})
    }

    setNotEditing = () => {
        this.setState({isEditing:false})
    }

    getIsEditing = () => {
        if (!this.state.isEditing) return (
        <div className="new-item-btn"  onClick={this.setEditing}>{this.props.addItemTxt}</div>
        ) 
        return (
            <div className="new-item-form">
                <form onSubmit={this.onSubmit} >
                <input onBlur={this.setNotEditing} placeholder={this.props.placeHolderTxt} type="text" onChange={this.onChange} value={this.state.txtValue} /> 
                <button type="submit">{this.props.addBtnTxt}</button> 
                </form>
            </div>
        )
    }


    onSubmit = (ev) => {
        ev.preventDefault()
        this.props.onAdd(this.state.txtValue)
        const isEditing = false
        const txtValue = ''
        this.setState({isEditing,txtValue})
    }

    render() {
        return (
            <div className="new-item-container">
                {this.getIsEditing()}
            </div>
        )
    }
}

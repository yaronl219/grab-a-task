import React, { Component } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

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
        <div className="new-item-btn"  onClick={this.setEditing}><AddIcon style={{fontSize:14}} />{this.props.addItemTxt}</div>
        ) 

        return (
            
            <div className="new-item-form">
                <form onBlur={this.setNotEditing} onSubmit={this.onSubmit} >
                    <input placeholder={this.props.placeHolderTxt} type="text" onChange={this.onChange} value={this.state.txtValue} autoFocus/> 
                <div className="save-btn-container">
                <button className="save-btn" onMouseDown={this.onSubmit}>{this.props.addBtnTxt}</button>
                <CloseIcon onClick={this.setNotEditing}/>
                </div>
                </form>
            </div>
        )
    }


    onSubmit = (ev) => {
        ev.preventDefault()
        if (!this.state.txtValue) return
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

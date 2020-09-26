import React, { Component } from 'react'

export class CardDetailsHeader extends Component {

    state = {
        txt: '',
        isEditing: false
    }

    componentDidMount() {
        const txt=this.props.headerTxt
        this.setState({txt})
    }

    onChangeText = (ev) => {
        const txt = ev.target.value
        this.setState({txt})
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        if (!this.state.txt) return
        this.setNotEditing()
        this.props.onUpdate(this.state.txt)
        
    }

    setEditing = () => {
        this.setState({ isEditing: true })
    }

    setNotEditing = () => {
        this.setState({ isEditing: false })
    }

    getIsEditing = () => {
        if (this.state.isEditing) return (
            <form onBlur={this.setNotEditing} onSubmit={this.onSubmit}>
                <input name="header" type="text" autoFocus value={this.state.txt} onChange={this.onChangeText}/>
            </form>
        )
        return <div onClick={this.setEditing}><h2>{this.state.txt}</h2></div>
    }

    render() {
        return (
            <div>
                {this.getIsEditing()}
            </div>
        )
    }
}

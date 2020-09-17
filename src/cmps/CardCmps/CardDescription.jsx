import React, { Component } from 'react'

export class CardDescription extends Component {

    state = {
        description: '',
        isEditing: false
    }


    componentDidMount() {
        this.setDescriptionFromProps()
    }

    setDescriptionFromProps = () => {
        const description = this.props.description
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

    render() {
        return (
            <div>
                <input value={this.state.description} onChange={this.onChange} placeholder="Enter a more details description here..." />
            </div>
        )
    }
}

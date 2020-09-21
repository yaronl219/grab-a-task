
import { Button, Checkbox } from '@material-ui/core'
import React, { Component } from 'react'
import { utils } from '../../services/utils'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

export class CardChecklistTodo extends Component {

    state = {
        isDone: false,
        isEditing: false,
        txtValue: '',
        isNew: false
    }

    setEditing = () => {
        this.setState({ isEditing: true })
    }
    setNotEditing = () => {
        this.setState({ isEditing: false })
    }

    removeText = () => {
        this.setState({txtValue:''})
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.title !== this.props.title || prevProps.isDone !== this.props.isDone) this.updateTodo()
    }

    componentDidMount() {
        console.log(this.props.todo)
        if (this.props.isNew) this.setState({ isNew: true })
        this.updateTodo()
    }

    getNewTodoDisplay = () => {
        if (this.state.isEditing) {
            return (
            <form onBlur={this.setNotEditing} onSubmit={this.onSubmit}>
                <input className="checkbox-text-edit" type="text" autoFocus value={this.state.txtValue} onChange={this.onChange} />
                <button className="save-btn" type="submit">Save</button>
            </form>
        )}
        return (
            <Button className="checklist-add-todo" onClick={this.setEditing}>
                Add an item
            </Button>
        )
    }

    getTextBox = () => {
        if (this.state.isEditing) return (
            <React.Fragment>
                <Checkbox checked={this.state.isDone} onChange={this.onCheck} />
                <form onBlur={this.setNotEditing} onSubmit={this.onSubmit}>
                    <input className="checkbox-text-edit" type="text" autoFocus value={this.state.txtValue} onChange={this.onChange} />
                    <button className="save-btn" type="submit">Save</button>
                </form>
            </React.Fragment>
        )
        return (
            <React.Fragment>
                <Checkbox checked={this.state.isDone} onChange={this.onCheck} />
                <div className="checklist-todo-title" onClick={this.setEditing}>
                    {this.state.txtValue}
                    <Button onClick={this.onRemove}>
                        <DeleteOutlineOutlinedIcon fontSize="inherit" />
                    </Button>
                </div>
            </React.Fragment>
        )
    }

    onSubmit = (ev) => {
        console.log(ev)
        ev.preventDefault()
        // this.setNotEditing()
        this.updateChecklist()

    }

    updateTodo = () => {
        
        const todo = this.props.todo
        if (!todo) return
        const txtValue = todo.title
        const isDone = todo.isDone

        this.setState({ isDone, txtValue })
    }

    onChange = (ev) => {
        console.log(ev)
        this.setState({ txtValue: ev.target.value })
    }

    onCheck = async(ev) => {
        
        let txt = ''
        let checkStatus = ev.target.checked
        if (checkStatus) {
            txt = `completed ${this.state.txtValue}`
        } else {
            txt = `marked ${this.state.txtValue} incomplete`
        }
        await this.props.addActivity(txt)
        console.log('checking')
        this.setState({ isDone: checkStatus}, this.updateChecklist)
    }

    onRemove = (ev) => {
        ev.stopPropagation()
        this.setState({ txtValue: '' }, this.updateChecklist)
    }

    updateChecklist = () => {
        let id;
        if (this.props.todo) {
            id = this.props.todo.id
        } else {
            id = utils.makeId()
        }
        const todo = {
            id,
            isDone: this.state.isDone,
            title: this.state.txtValue
        }
        
        this.props.onUpdate(todo)
        if (this.state.isNew) this.setState({txtValue:''})
    }

    render() {
        if (!this.props.displayCompleted && this.state.isDone) return <React.Fragment />
        return (
            <div className="checklist-todo">

                {(this.state.isNew) ? this.getNewTodoDisplay() : this.getTextBox()}
            </div>
        )
    }
}

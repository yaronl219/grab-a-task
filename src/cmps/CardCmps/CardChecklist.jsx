import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress } from '@material-ui/core'
import React, { Component } from 'react'
import { CardChecklistTodo } from './CardChecklistTodo'
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
export class CardChecklist extends Component {

    state = {
        tasksCompleted: 0,
        totalTasks: 0,
        displayCompleted: true,
        showDialog: false
        
    }

    componentDidMount() {        
        this.setTasksStatus()

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.checklist !== prevProps.checklist) this.setTasksStatus()
    }


    setTasksStatus = () => {
        let tasksCompleted = 0
        let totalTasks = 0

        this.props.checklist.todos.forEach(todo => {
            if (todo.isDone) tasksCompleted += 1
            totalTasks += 1
        });

        this.setState({ tasksCompleted, totalTasks })
    }

    toggleDisplayCompleted = () => {
        if (this.state.displayCompleted) return this.setState({ displayCompleted: false })
        return this.setState({ displayCompleted: true })
    }

    getDisplayCheckedBtn = () => {
        if (!this.state.tasksCompleted) return <React.Fragment />
        let btnContent;
        if (this.state.displayCompleted) {
            btnContent = 'Hide Completed Items'
        } else {
            btnContent = `Show Checked Items (${this.state.tasksCompleted})`
        }

        return (
            <Button onClick={this.toggleDisplayCompleted}>{btnContent}</Button>
        )
    }

    onRemoveChecklist = async() => {
        const checklist = {...this.props.checklist}
        checklist.title = ''
        await this.props.addActivity(`removed ${this.props.checklist.title}`)
        this.props.onUpdate(checklist)
        this.closeDialog()

    }


    openDialog = () => {
        this.setState({ showDialog: true })
    }

    closeDialog = () => {
        this.setState({ showDialog: false })
    }

    getPercentCompleted = () => {
        const percent = Math.round((this.state.tasksCompleted / this.state.totalTasks) * 100)
        return percent
    }

    onUpdateChecklist = (newTodo) => {
        // take the updated todo and insert it into the list
        let todos = [...this.props.checklist.todos]
        // find the todo index
        const todoIdx = todos.findIndex(todo => todo.id === newTodo.id)
        // if new title is blank - remove todo
        if (!newTodo.title) {
            todos.splice(todoIdx,1)
        } else if (todoIdx <0) { //if the index is less than 0 - this is a new item
            todos.push(newTodo)
        } else {
            todos[todoIdx] =  newTodo
        }
        const checklist = {...this.props.checklist}
        checklist.todos = todos
        this.props.onUpdate(checklist)
    }

    render() {
        // if (!this.state.totalTasks) return <React.Fragment />
        return (
            <div className="checklist">
                <div className="checklist-title-container">
                    <CheckBoxOutlinedIcon />
                    <div className="checklist-title">{this.props.checklist.title}</div>
                    <div className="checklist-title-btns">
                    {this.getDisplayCheckedBtn()}
                    <Button onClick={this.openDialog}>Remove</Button>
                    </div>
                </div>
                {((this.state.totalTasks) ? (
                    <div className="checklist-progress">
                    <div className="checklist-progress-numbers">%{this.getPercentCompleted()}</div>
                    <LinearProgress value={this.getPercentCompleted()} variant="determinate" /> 
                    </div>
                    ) : <React.Fragment />)
                }
                <main className="checklist-main">
                    {this.props.checklist.todos.map(todo => <CardChecklistTodo key={todo.id} displayCompleted={this.state.displayCompleted} todo={todo} addActivity={this.props.addActivity} onUpdate={this.onUpdateChecklist}/>)}
                    <CardChecklistTodo isNew={true} onUpdate={this.onUpdateChecklist}/>
                </main>
                <Dialog onClose={this.closeDialog} open={this.state.showDialog}>
                    <DialogTitle id="alert-dialog-title">{"Remove this checklist?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Deleting a checklist is permanent and there is no way to get it back.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeDialog} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.onRemoveChecklist} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

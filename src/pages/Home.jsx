import { Backdrop, BottomNavigation, BottomNavigationAction, CircularProgress, Dialog, IconButton } from '@material-ui/core';
import React, { Component } from 'react'
import SwipeableViews from 'react-swipeable-views';
import { boardService } from '../services/boardService';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { BoardHub } from '../cmps/BoardSelector/BoardHub';
import { templateService } from '../services/templateService';
import { CloseOutlined } from '@material-ui/icons';



export class Home extends Component {

    state = {
        view: 0,
        boards: null,
        templates: null,
        templateLoading: false,
        selectedTemplate: null,
        isCreateTemplateOpen: false,
        isLoading: false
    }

    async componentDidMount() {

        this.setViewFromParams()
        const boards = await boardService.query({filter:{isArchived:false},limit:2,skip:0})
        const templates = await templateService.query({limit:3,skip:0})
        this.setState({ boards, templates })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.view !== this.props.match.params.view) {
            this.setViewFromParams()
        }
    }

    setViewFromParams = () => {
        const view = this.props.match.params.view

        if (view === 'templates') return this.setState({ view: 1 })
        return this.setState({ view: 0 })
    }

    onSelectBoard = (boardId) => {
        this.props.history.push(`/board/${boardId}`)
    }


    onSelectTemplate = async (templateId) => {
        this.setState({ selectedTemplate: templateId, isCreateTemplateOpen: true })

    }

    onCloseCreateTemplate = () => {
        this.setState({ selectedTemplate: null, isCreateTemplateOpen: false })
    }

    onCreateBoardFromTemplate = async (boardName) => {
        this.setState({ templateLoading: true }, async () => {
            const boardId = await templateService.createBoardFromTemplate(this.state.selectedTemplate,boardName)
            this.setState({ templateLoading: false })
            this.props.history.push(`board/${boardId}`)
        })
    }

    onRemoveBoard = async(boardId) => {
        this.setState({isLoading:true}, async() => {
            await boardService.archiveBoard(boardId)
            const boards = await boardService.query()
            this.setState({boards}, () => {
                this.setState({isLoading:false})
            })
        })
    }

    onRemoveTemplate = async(templateId) => {
        
        this.setState({isLoading:true}, async() => {
            await templateService.remove(templateId)
            const templates = await templateService.query()
            this.setState({templates}, ()=> this.setState({isLoading:false}))
        })
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        this.onCreateBoardFromTemplate(ev.target[0].value)
    }

    setView = (idx) => {
        if (!idx) {
            this.props.history.push('/board')
        } else {
            this.props.history.push('/templates')
        }
    }



    render() {
        return (
            <div>
                <Backdrop open={this.state.isLoading}><div className="circular-progress-container"><CircularProgress /></div></Backdrop> 
                <Dialog
                    onClose={this.onCloseCreateTemplate}
                    onBackdropClick={this.onCloseCreateTemplate}
                    open={this.state.isCreateTemplateOpen}>
                    <div className="create-board-from-template-container">
                        <div className="create-board-header">
                            <div></div>
                            <div><h6>Create Board</h6></div>
                            <IconButton onClick={this.onCloseCreateTemplate}>
                                <CloseOutlined />
                            </IconButton>
                        </div>
                        <div className="form-container">
                            <span>Enter a name for your board</span>
                        <form onSubmit={this.onSubmit}>
                            <input name="title" type="text"/>
                            <button className="save-btn">Create</button>
                        </form>
                    </div>
                    </div>
                </Dialog>
                <BottomNavigation
                    className="home-nav"
                    value={this.state.view}
                    onChange={(event, newValue) => {
                        this.setView(newValue);
                    }}
                    showLabels
                >
                    <BottomNavigationAction label="Boards" icon={<DashboardIcon />} />
                    <BottomNavigationAction label="Templates" icon={<DeveloperBoardIcon />} />
                </BottomNavigation>

                <SwipeableViews onSwitching={this.setView} index={this.state.view} containerStyle={{ height: '100vh' }}>
                    <BoardHub boards={this.state.boards} onSelect={this.onSelectBoard} onRemove={this.onRemoveBoard} header="Boards" />
                    <BoardHub boards={this.state.templates} onSelect={this.onSelectTemplate} onRemove={this.onRemoveTemplate} isLoading={this.state.templateLoading} header="Templates" />
                </SwipeableViews>
                

            </div>
        )
    }
}

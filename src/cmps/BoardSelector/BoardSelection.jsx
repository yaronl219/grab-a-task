import { Dialog, IconButton } from '@material-ui/core';
import React, { Component } from 'react'

import { CloseOutlined } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import { BoardHub } from './BoardHub';
import { boardService } from '../../services/boardService';
import { templateService } from '../../services/templateService';
import { AddNewBoard } from '../BoardHeader/AddNewBoard';
import { withRouter } from 'react-router';

export class BoardSelection extends Component {

    state = {
        templatesPage: 0,
        boardsPage: 0,
        boardsPerPage: 2,
        templatesPerPage: 3,
        totalBoardPages: 1,
        totalTemplatePages: 1,
        boards: null,
        templates: null,
        templateLoading: false,
        selectedTemplate: null,
        isCreateTemplateOpen: false,
        isLoading: false,
        isCreateBoardOpen: false
    }



    componentDidUpdate(prevProps, prevState) {
        if (prevState.boardsPage !== this.state.boardsPage) {
            this.getBoards()
        }
        if (prevState.templatesPage !== this.state.templatesPage) {
            this.getTemplates()
        }
    }

    async componentDidMount() {
        await this.getBoards()
        this.getTemplates()
    }


    getBoards = async () => {
        const data = await boardService.query({ filter: { isArchived: false }, limit: this.state.boardsPerPage, skip: this.state.boardsPage * this.state.boardsPerPage })
        const totalBoardPages = Math.ceil(data.boardSize / this.state.boardsPerPage)
        
        this.setState({ boards: data.boards, totalBoardPages })
        return Promise.resolve()
    }

    getTemplates = async () => {
        const data = await templateService.query({ limit: this.state.templatesPerPage, skip: this.state.templatesPage * this.state.templatesPerPage })
        const totalTemplatePages = Math.ceil(data.templateSize / this.state.templatesPerPage)

        this.setState({ templates: data.templates, totalTemplatePages })
        return Promise.resolve()
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
            const boardId = await templateService.createBoardFromTemplate(this.state.selectedTemplate, boardName)
            this.setState({ templateLoading: false })
            this.props.history.push(`board/${boardId}`)
        })
    }

    onRemoveBoard = async (boardId) => {
        this.setState({ isLoading: true }, async () => {
            await boardService.archiveBoard(boardId)
            await this.getBoards()
            this.setState({ isLoading: false })

        })
    }

    onRemoveTemplate = async (templateId) => {

        this.setState({ isLoading: true }, async () => {
            await templateService.remove(templateId)
            await this.getTemplates()
            this.setState({ isLoading: false })
        })
    }

    onChangeTemplatePage = (ev, page) => {
        
        this.setState({ templatesPage: page - 1 })
    }

    onChangeBoardPage = (ev, page) => {
        
        this.setState({ boardsPage: page - 1 })
    }
    onSubmit = (ev) => {
        ev.preventDefault()
        this.onCreateBoardFromTemplate(ev.target[0].value)
    }

    onRedirect = (id) => {
        this.onCloseCreateBoard()
        this.props.history.push(`/board/${id}`)
    }

    onOpenCreateBoard = () => {
        this.setState({isCreateBoardOpen:true})
    }

    onCloseCreateBoard = () => {
        this.setState({isCreateBoardOpen:false})
    }

    render() {
        return (
            <React.Fragment>
                <Dialog 
                onClose={this.onCloseCreateBoard}
                onBackdropClick={this.onCloseCreateBoard}
                open={this.state.isCreateBoardOpen}
                className="add-board-modal"
                >
                    <AddNewBoard onCloseModal={this.onCloseCreateBoard} redirectPath={this.onRedirect}/>
                </Dialog>
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
            <div className="board-selector" >
                <section className="boards">
                    <BoardHub boards={this.state.boards} createBoard={true} onAddBoard={this.onOpenCreateBoard} onSelect={this.onSelectBoard} onRemove={this.onRemoveBoard} header="Boards" />
                    <Pagination count={this.state.totalBoardPages} defaultPage={1} onChange={this.onChangeBoardPage} shape="rounded" />
                </section>
                <section className="templates">
                    <BoardHub boards={this.state.templates} onSelect={this.onSelectTemplate} onRemove={this.onRemoveTemplate} isLoading={this.state.templateLoading} header="Templates" />
                    <Pagination count={this.state.totalTemplatePages} defaultPage={1} onChange={this.onChangeTemplatePage} shape="rounded" />
                </section>

            </div>
            </React.Fragment>
        )
    }
}

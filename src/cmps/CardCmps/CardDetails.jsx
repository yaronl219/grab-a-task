import { Card, IconButton } from '@material-ui/core';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { updateCard, loadBoard, switchGroup } from '../../store/actions/boardActions';
import { CardAttachmentList } from './CardAttachmentList';
import { CardSidebar } from './CardSidebar';
import CloseIcon from '@material-ui/icons/Close';
import { CardDescription } from './CardDescription';
import { CardDetailsHeader } from './CardDetailsHeader';
import { CardLabels } from './CardLabels';
import { CardDueDateSetter } from './CardDueDateSetter';
import { CardChecklistList } from './CardChecklistList';
import { ActivityLog } from '../Sidebar/ActivityLog';

class _CardDetails extends Component {

    state = {
        groupId: null,
        groupName: '',
        card: null
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.cardId !== this.props.cardId) {
            this.getCardDetails()
        }
    }


    componentDidMount() {
        if (!this.props.board || Object.keys(!this.props.board)) {
            this.props.loadBoard('b101').then(() => {
                return this.getCardDetails()
            })
        }
        // this.getCardDetails()
    }

    getCardDetails = () => {
        this.props.board.groups.forEach(group => {
            group.cards.forEach(card => {
                if (card.id === this.props.cardId) {
                    const groupId = group.id
                    const groupName = group.title
                    this.setState({ groupId, groupName, card })
                    return
                }
            })
        })
    }

    onCloseModal = () => {
        const url = window.location.href
        const regex = /\/board\/.+\//i
        const targetUrl = url.match(regex)[0]
        this.props.history.push(targetUrl)
    }

    openEditLabelsModal = () => {
        // TODO - Create and connect the modal
        console.log('should open edit labels modal')
    }


    getLabels = () => {
        const labels = this.state.card.labels
        if (labels) return (
            <div className="card-details-label-container">
                <h3>Labels</h3>
                <CardLabels onClickLabel={this.openEditLabelsModal}
                    cardLabels={labels}
                    boardLabels={this.props.board.labels}
                    preview={false}
                />
            </div>
        )
        // console.log(this.state.card.labels)
    }
    // getCardModules = () => {
    //     let cardModules = []
    //     const card = this.state.card
    //     if (card.attachments) cardModules.push(<CardAttachmentList attachments={card.attachments} />)
    //     if (card.checklists) cardModules.push(<CardChecklist checklists={card.checklists} />)
    // }

    onArchiveCard = () => {
        let card = { ...this.state.card }
        card.archivedAt = Date.now()
        this.submitCard(card)
        this.onCloseModal()
    }

    onUpdateDueDate = (dueDate) => {
        let card = { ...this.state.card }
        card.dueDate = dueDate
        this.setState({ card }, () => this.submitCard(card))
    }

    onUpdateHeader = (txt) => {
        let card = { ...this.state.card }
        card.title = txt
        this.setState({ card }, () => this.submitCard(card))
    }

    submitCard = (card) => {
        this.props.updateCard(this.props.board, card)
    }

    onUpdateDesc = (description) => {
        const card = { ...this.state.card }
        card.description = description
        this.setState({ card }, () => this.submitCard(card))
    }

    onUpdateChecklists = (newChecklist) => {
        console.log(newChecklist)
        const card = { ...this.state.card }
        if (!card.checklists) card.checklists = []
        // updating
        const checklistIdx = card.checklists.findIndex(checklist => checklist.id === newChecklist.id)
        if (checklistIdx >=0) {
            card.checklists = card.checklists.map(checklist => {
                if (checklist.id === newChecklist.id) return newChecklist
                return checklist
            })
        } else {
            card.checklists.push(newChecklist)
        }

        // removing excess checklists
        card.checklists = card.checklists.filter(checklist => {
            if (checklist.title) return checklist
        }
        )
        this.setState({ card }, () => this.submitCard(card))
    }


    render() {
        const card = this.state.card
        if (!card) return <div className="card-details-container">Loading...</div>
        return (
            <div className="card-details-container">
                <IconButton onClick={this.onCloseModal} aria-label="close">
                    <CloseIcon />
                </IconButton>
                <div className="card-details-header-container">
                    <CardDetailsHeader headerTxt={card.title} onUpdate={this.onUpdateHeader} />
                    <small>in list <span>{this.state.groupName}</span></small>
                </div>
                {this.getLabels()}
                <CardDueDateSetter onUpdateDueDate={this.onUpdateDueDate} dueDate={card.dueDate} displayDate={true} displayTime={true} />
                <main className="card-details-main">
                    <CardDescription onUpdateDesc={this.onUpdateDesc} description={card.description} />
                    <CardChecklistList checklists={card.checklists} onUpdate={this.onUpdateChecklists} />
                </main>
                <aside className="card-details-sidebar">
                    <CardSidebar dueDate={card.dueDate} onUpdateDueDate={this.onUpdateDueDate} onArchiveCard={this.onArchiveCard} onUpdateChecklists={this.onUpdateChecklists} />
                </aside>
                <ActivityLog
                    boardId={this.props.board._id}
                    displayMode="card"
                    activities={this.props.board.activities.filter(activity => activity.card.id === card.id)} />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        board: state.boardReducer.board
    };
};
const mapDispatchToProps = {
    loadBoard,
    switchGroup,
    updateCard
};

export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(connect(withRouter)(_CardDetails));

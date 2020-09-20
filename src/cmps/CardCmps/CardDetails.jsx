import { IconButton } from '@material-ui/core';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { updateCard, loadBoard, switchGroup, addActivity } from '../../store/actions/boardActions';
import { CardAttachmentList } from './CardAttachmentList';
import { CardSidebar } from './CardSidebar';
import CloseIcon from '@material-ui/icons/Close';
import { CardDescription } from './CardDescription';
import { CardDetailsHeader } from './CardDetailsHeader';
import { CardLabels } from './CardLabels';
import { CardDueDateSetter } from './CardDueDateSetter';
import { CardChecklistList } from './CardChecklistList';
import { ActivityLog } from '../Sidebar/ActivityLog';
import ListIcon from '@material-ui/icons/List';
import { CardAddComment } from './CardAddComment';
import { boardService } from '../../services/boardService';

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

    onCloseCard = () => {
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
        if (labels && labels.length) return (
            <div className="card-details-label-container">
                <h5>Labels</h5>
                <CardLabels onClickLabel={this.openEditLabelsModal}
                    cardLabels={labels}
                    boardLabels={this.props.board.labels}
                    preview={false}
                />
            </div>
        )
        return <React.Fragment />
    }

    addActivity = async(txt) => {
        const activity = {
            "txt": txt,
            "commentTxt": '',
            "card": {
                "id": this.state.card.id,
                "title": this.state.card.title
            }
        }

            const newActivity = boardService.createActivity(activity)
            await this.props.addActivity(this.props.board,newActivity)
            return true

    }

    onArchiveCard = async() => {
        let card = { ...this.state.card }
        card.archivedAt = Date.now()
        await this.addActivity('archived')
        this.submitCard(card)
        this.onCloseCard()
    }

    onUpdateDueDate = async(dueDate) => {
        let card = { ...this.state.card }
        card.dueDate = dueDate
        await this.addActivity('updated due date')
        this.setState({ card }, () => this.submitCard(card))
    }

    onAddComment = (txt) => {
        const activity = {
            "txt": "",
            "commentTxt": txt,
            "card": {
                "id": this.state.card.id,
                "title": this.state.card.title
            }
        }
        const newActivity = boardService.createActivity(activity)
        this.props.addActivity(this.props.board,newActivity)

    }

    onUpdateHeader = async(txt) => {
        let card = { ...this.state.card }
        card.title = txt
        await this.addActivity('updated the title')
        this.setState({ card }, () => this.submitCard(card))
    }


    submitCard = (card) => {
        this.props.updateCard(this.props.board, card)
    }

    onUpdateDesc = async(description) => {
        const card = { ...this.state.card }
        card.description = description
        await this.addActivity('updated the description')
        this.setState({ card }, () => this.submitCard(card))

    }

    onUpdateChecklists = async(newChecklist) => {
        console.log(newChecklist)
        const card = { ...this.state.card }
        if (!card.checklists) card.checklists = []
        // updating
        const checklistIdx = card.checklists.findIndex(checklist => checklist.id === newChecklist.id)
        if (checklistIdx >= 0) {
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
            <div className="card-details-background">
                <div className="card-details-container">
                    <IconButton onClick={this.onCloseCard} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <div className="card-details-header-container">
                        <CardDetailsHeader headerTxt={card.title} onUpdate={this.onUpdateHeader} />
                        <small>in list <span>{this.state.groupName}</span></small>
                    </div>
                    <div className="card-details-attrs">
                        {this.getLabels()}
                        <div>
                            {(this.state.card.dueDate ? <h5>Due Date</h5> : <React.Fragment />)}
                            <CardDueDateSetter onUpdateDueDate={this.onUpdateDueDate} dueDate={card.dueDate} displayDate={true} displayTime={true} />
                        </div>
                    </div>
                    <section>
                        <main className="card-details-main">
                            <CardDescription onUpdateDesc={this.onUpdateDesc} description={card.description} />
                            <CardChecklistList addActivity={this.addActivity} checklists={card.checklists} onUpdate={this.onUpdateChecklists} />
                        </main>
                        <aside className="card-details-sidebar">
                            <CardSidebar addActivity={this.addActivity} dueDate={card.dueDate} onUpdateDueDate={this.onUpdateDueDate} onArchiveCard={this.onArchiveCard} onUpdateChecklists={this.onUpdateChecklists} />
                        </aside>
                    </section>
                    <div className="card-details-activity-log">
                        <div className="card-details-activities-title">
                            <ListIcon />
                            <h5>Activities</h5>
                        </div>
                        <CardAddComment onAddComment={this.onAddComment} />
                        <ActivityLog
                            boardId={this.props.board._id}
                            displayMode="card"
                            activities={this.props.board.activities.filter(activity => activity.card.id === card.id)} />
                    </div>
                </div>
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
    updateCard,
    addActivity
    
};

export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(connect(withRouter)(_CardDetails));

import { Card, IconButton } from '@material-ui/core';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { updateCard, loadBoard, switchGroup } from '../../store/actions/boardActions';
import { CardAttachmentList } from './CardAttachmentList';
import { CardChecklist } from './CardChecklist';
import { CardSidebar } from './CardSidebar';
import CloseIcon from '@material-ui/icons/Close';
import { CardDescription } from './CardDescription';

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

    getCardModules = () => {
        let cardModules = []
        const card = this.state.card
        if (card.attachments) cardModules.push(<CardAttachmentList attachments={card.attachments} />)
        if (card.checklists) cardModules.push(<CardChecklist checklists={card.checklists} />)
    }

    onArchiveCard = () => {
        let card = {...this.state.card}
        card.archivedAt = Date.now()
        this.props.updateCard(this.props.board,card)
        this.onCloseModal()
    }

    submitCard = () => {
       
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
                    <h2>{card.title}</h2>
                    <small>in list <span>{this.state.groupName}</span></small>
                </div>
                <main className="card-details-main">
                <CardDescription description={card.description}/>
                </main>
                <aside className="card-details-sidebar">
                    <CardSidebar onArchiveCard={this.onArchiveCard}/>
                </aside>
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

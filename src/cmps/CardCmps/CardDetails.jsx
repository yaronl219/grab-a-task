import { Card, IconButton } from '@material-ui/core';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { loadBoard } from '../../store/actions/boardActions';
import { CardAttachmentList } from './CardAttachmentList';
import { CardChecklist } from './CardChecklist';
import { CardSidebar } from './CardSidebar';
import CloseIcon from '@material-ui/icons/Close';

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
        console.log(this.props)
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
        console.log(targetUrl)
        this.props.history.push(targetUrl)
    }

    getCardModules = () => {
        let cardModules = []
        const card = this.state.card
        if (card.attachments) cardModules.push(<CardAttachmentList attachments={card.attachments} />)
        if (card.checklists) cardModules.push(<CardChecklist checklists={card.checklists} />)
    }


    render() {
        const card = this.state.card
        if (!card) return <div>Loading...</div>
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

                </main>
                <aside className="card-details-sidebar">
                    <CardSidebar />
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
    loadBoard
};

export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(connect(withRouter)(_CardDetails));

// Edit card preivew - should have edit labels, change memebers change due date and archive
import React, { Component } from 'react'

import {Button, Dialog } from '@material-ui/core';
import { CardLabels } from './CardLabels';
import { CardPreviewDueDate } from './CardPreviewDueDate';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import { connect } from 'react-redux';
import { addActivity, updateCard } from '../../store/actions/boardActions';
import { boardService } from '../../services/boardService';
import { CardDueDateSetter } from './CardDueDateSetter';
import { CardMembersList } from './CardMembersList';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import { Share } from '../Share';

class _CardPreviewActions extends Component {

    state = {
        isOpen: false,
        offsetTop: null,
        offsetLeft: null,
        width: null,
        txtValue: '',
        isMemberListOpen: false
    }

    ref = React.createRef()

    submitCard = (card,activity) => {
        return new Promise(resolve => {
            this.props.updateCard(this.props.board, card,activity).then(() => {
                this.onClose()
            })
        })
    }

    onClose = () => {
        this.props.onClose()
    }
    componentDidMount() {
        this.getParentPos()
        this.getCurrTitle()
    }
    
    createActivity = (txt) => {
        const card = this.props.props.card
        const activity = {
            txt: txt,
            commentTxt: '',
            card: {
                id: card.id,
                title: card.title
            }
        }

        return boardService.createActivity(activity)
    }
    onUpdateDueDate = (dueDate) => {
        let card = { ...this.props.props.card }
        card.dueDate = dueDate
        const activity = this.createActivity('updated due date')
        this.submitCard(card,activity)
        
    }

    onUpdateHeader =  () => {
        let card = { ...this.props.props.card }
        console.log(card)
        card.title = this.state.txtValue
        const activity = this.createActivity('updated the title')
        this.submitCard(card,activity)
    }

    onChange = (ev) => {
        const txtValue = ev.target.value
        this.setState({ txtValue })
    }

    onKeyPress = (ev) => {
        if (ev.key === 'Enter') return this.onUpdateHeader()
    }

    toggleCardMembersMenu = () => {
        if (this.state.isMemberListOpen) return this.setState({isMemberListOpen:false})
        this.setState({isMemberListOpen:true})
    }
    onArchiveCard =   () => {
        let card = { ...this.props.props.card }
        card.archivedAt = Date.now()
        const activity = this.createActivity('archived')
        this.submitCard(card,activity)
         
    }

    onUpdateCardMembers = async (card) => {
        
        this.setState({ card }, () => {
            const activity = this.createActivity('edited the card members')
            this.submitCard(card,activity)
            
        })
    }


    getParentPos = () => {
        const pos = this.props.anchorEl.current.parentElement.getBoundingClientRect()
        this.setState({ offsetTop: pos.top, offsetLeft: pos.left, width: pos.width })
    }

    getCurrTitle() {
        const txtValue = this.props.props.card.title
        this.setState({ txtValue })
    }
    getCardCover = () => {

        const cardCover = this.props.props.card.cover
        if (!cardCover) return <React.Fragment />
        if (!cardCover.src) return (
            // if there is no src - this is a color
            <div className="card-preview-cover-color" style={{backgroundColor:cardCover.color}} />
        )
        return (
            <div className="card-preview-cover-image" style={{backgroundImage:`url(${cardCover.src})`}} /> 
        )
    }

    getCardPath = () => {
        let href = window.location.href
        let cardId = this.props.props.card.id
        return `${href}/${cardId}`
    }

    render() {
        if (!this.state.offsetTop || !this.state.offsetLeft) return <div></div>
        const props = this.props.props
        return (

            <Dialog onClose={this.props.onClose} open={true} >
                <div  className="card-edit-container" onClick={(ev) => ev.stopPropagation()} style={{
                    left: `${this.state.offsetLeft}px`,
                    top: `${this.state.offsetTop}px`,
                    position: 'fixed'
                }}>
                    
                    {(this.state.isMemberListOpen) ? <CardMembersList anchorEl={this.ref} updateCardMembers={this.onUpdateCardMembers} toggleList={this.toggleCardMembersMenu} boardMembers={this.props.board.members} card={props.card}/> : <React.Fragment />}
                    
                    <div className="card-edit-left">

                        <div className="card-preview" style={{ width: `${this.state.width}px` }}>
                            {this.getCardCover()}
                            {this.props.cardStyle}
                            <CardLabels
                                cardLabels={props.card.labels}
                                boardLabels={props.board.labels}
                                preview={true}
                            />
                            <form>
                                <textarea className="card-preview-header card-preview-title-edit" autoFocus onKeyPress={this.onKeyPress} onChange={this.onChange} value={this.state.txtValue} />
                            </form>

                            <div className="card-preview-attrs">
                                <CardPreviewDueDate dueDate={props.card.dueDate} />
                                {this.props.attrs}
                            </div>
                        </div>
                        <button className="save-btn" onClick={this.onUpdateHeader}>Save</button>
                    </div>
                    <div  className="card-edit-right">
                        <div className="card-preview-edit-actions-container">
                            <Button onClick={this.onArchiveCard}><ArchiveOutlinedIcon /> <span>Archive Card</span></Button>
                            <CardDueDateSetter dueDate={props.dueDate} onUpdateDueDate={this.onUpdateDueDate} />
                            <Button ref={this.ref} onClick={this.toggleCardMembersMenu}><PeopleAltOutlinedIcon /><span>Members</span></Button>
                            <Share item="card" path={this.getCardPath()} />
                        </div>
                    </div>

                </div>
            </Dialog>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardReducer.board
    };
};
const mapDispatchToProps = {
    updateCard,
    addActivity

};

export const CardPreviewActions = connect(mapStateToProps, mapDispatchToProps)(_CardPreviewActions);

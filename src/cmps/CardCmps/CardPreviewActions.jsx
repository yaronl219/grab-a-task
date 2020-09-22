// Edit card preivew - should have edit labels, change memebers change due date and archive
import React, { Component } from 'react'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Backdrop, Button, Dialog, IconButton, Popover } from '@material-ui/core';
import { CardLabels } from './CardLabels';
import { CardPreviewDueDate } from './CardPreviewDueDate';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import { connect } from 'react-redux';
import { addActivity, updateCard } from '../../store/actions/boardActions';
import { boardService } from '../../services/boardService';
import { CardDueDateSetter } from './CardDueDateSetter';
import { CardMembersList } from './CardMembersList';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';

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

    submitCard = async (card) => {
        return new Promise(resolve => {
            this.props.updateCard(this.props.board, card).then(() => {
                this.onClose()
                resolve()
            })
        })
    }

    onClose = () => {
        this.props.onClose()
    }
    componentDidMount() {
        console.log(this.props)
        this.getParentPos()
        this.getCurrTitle()
    }

    onUpdateDueDate = async (dueDate) => {
        let card = { ...this.props.props.card }
        card.dueDate = dueDate
        await this.submitCard(card)
        this.addActivity('updated due date')
    }

    onUpdateHeader = async () => {
        let card = { ...this.props.props.card }
        console.log(card)
        card.title = this.state.txtValue
         
        await this.submitCard(card)
        this.addActivity('updated the title')

    }

    addActivity = async (txt) => {
        const card = this.props.props.card
        const activity = {
            "txt": txt,
            "commentTxt": '',
            "card": {
                "id": card.id,
                "title": card.title
            }
        }

        const newActivity = boardService.createActivity(activity)
        await this.props.addActivity(this.props.board, newActivity)
        return true

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
    onArchiveCard = async () => {
        let card = { ...this.props.props.card }
        card.archivedAt = Date.now()
         await this.submitCard(card)
         this.addActivity('archived')
    }

    onUpdateCardMembers = async (card) => {
        
        this.setState({ card }, async() => {
            await this.submitCard(card)
            this.addActivity('edited the card members')
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

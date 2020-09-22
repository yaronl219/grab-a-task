import { Avatar, Button, CircularProgress, IconButton } from '@material-ui/core';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { updateCard, loadBoard, switchGroup, addActivity } from '../../store/actions/boardActions';
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
import { LabelPalette, LabelPallete } from '../Sidebar/LabelPalette';
import { CardMembersList } from './CardMembersList';
import { CardImgUpload } from './CardImgUpload';
import { cardService } from '../../services/cardService/cardService';
import { CardImagesList } from './CardImagesList';

class _CardDetails extends Component {

    state = {
        groupId: null,
        groupName: '',
        card: null,
        commentsOnly: false,
        isLabelPaletteShowing: false,
        isCardMemeberShown: false,
        isUploadZoneOpen: false,
        isUploading: false
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.cardId !== this.props.cardId) {
            this.getCardDetails()
        }
        if (prevState.isUploading !== this.state.isUploading) {
            console.log('detected upload')
        }
    }

    ref = React.createRef()

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
        // const url = window.location.href
        // const regex = /\/board\/.+\//i
        // const targetUrl = url.match(regex)[0]
        this.props.history.push(`/board/${this.props.boardId}`)
    }

    openEditLabelsModal = () => {
        // TODO - Create and connect the modal
        console.log('should open edit labels modal')
    }

    toggleCommentsOnly = () => {
        if (this.state.commentsOnly) return this.setState({ commentsOnly: false })
        return this.setState({ commentsOnly: true })
    }
    toggleLabelPalette = () => {
        this.setState({ isLabelPaletteShowing: !this.state.isLabelPaletteShowing })
    }
    toggleDisplayMembers = () => {
        if (this.state.isCardMemeberShown) return this.setState({ isCardMemeberShown: false })
        return this.setState({ isCardMemeberShown: true })
    }
    toggleUploadDropzone = () => {
        if (this.state.isUploadZoneOpen) return this.setState({ isUploadZoneOpen: false })
        return this.setState({ isUploadZoneOpen: true })
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

    addActivity = async (txt) => {
        const activity = {
            "txt": txt,
            "commentTxt": '',
            "card": {
                "id": this.state.card.id,
                "title": this.state.card.title
            }
        }

        const newActivity = boardService.createActivity(activity)
        await this.props.addActivity(this.props.board, newActivity)
        return true

    }

    onArchiveCard = async () => {
        let card = { ...this.state.card }
        card.archivedAt = Date.now()
        await this.submitCard(card)
        await this.addActivity('archived')
        this.onCloseCard()
    }

    onUpdateDueDate = async (dueDate) => {
        let card = { ...this.state.card }
        card.dueDate = dueDate
        
        this.setState({ card }, async() => {
            await this.submitCard(card)
            this.addActivity('updated due date')})
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
        this.props.addActivity(this.props.board, newActivity)

    }

    onUpdateHeader = async (txt) => {
        let card = { ...this.state.card }
        card.title = txt
        
        this.setState({ card }, async() => {
            await this.submitCard(card)
            this.addActivity('updated the title')
        })
    }
    getCardDetailsMembers = () => {
        const cardMembers = this.state.card.members
        if (!cardMembers || !cardMembers.length) return <React.Fragment />
        
        const cardMembersEl =  cardMembers.map((member, idx) => {
            const splitName = member.fullName.split(' ')
            const initials = splitName.map(name => name[0])
            return <div key={100 + idx} className="card-details-member"><Avatar>{initials}</Avatar></div>
        })
        return <div className="card-details-members"><h5>Members</h5><div>{cardMembersEl}</div></div>
    }


    submitCard = (card) => {
        
        return new Promise(resolve => {
            this.props.updateCard(this.props.board, card).then(() => resolve())

        })
    }

    onUpdateCardMembers = async (card,txt) => {

        this.setState({ card }, async() => {
            await this.submitCard(card)
            this.addActivity(txt)
        })
    }

    onUpdateDesc = async (description) => {
        const card = { ...this.state.card }
        card.description = description

        this.setState({ card }, async() => {
            await this.submitCard(card)
            this.addActivity('updated the description')
        })
    }

    setUploading = () => {
        return new Promise(resolve => {
            this.setState({isUploading:true},resolve(true))
        })
    }

    onAddImage = (imgRef) => {
        const newImg = cardService.createImage(imgRef)
        const card = { ...this.state.card }
        if (!card.attachments) card.attachments = []
        card.attachments.push(newImg)
        
            this.setState({card}, async() => {
            
                await this.submitCard(card)
                await this.addActivity('added an image')
                this.setState({isUploading:false})
            })
        
    }

    onUpdateAttachments = async (newAttachment) => {
        const card = { ...this.state.card }
        const idx = card.attachments.findIndex(att => att.id === newAttachment.id)
        console.log(newAttachment)
        if (!newAttachment.title.length){
            console.log('should remove')
            card.attachments.splice(idx,1)
        } else {
            card.attachments[idx] = newAttachment
        }
        console.log(card.attachments)
        this.setState({card},() => {
            this.submitCard(card)
            .then(() => {
                (newAttachment.title.length) ? this.addActivity('edited the title of an image') : this.addActivity('removed an image')
            })
        }) 
    }


    onUpdateChecklists = async (newChecklist) => {
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
        })
        this.setState({ card }, () => this.submitCard(card))
    }

    getFilteredActivities = () => {
        const card = this.state.card
        let cardActivities = this.props.board.activities.filter(activity => activity.card.id === card.id)
        if (this.state.commentsOnly) cardActivities = cardActivities.filter(activity => {
            if (activity.commentTxt.length) return activity
        })
        return cardActivities
    }

    render() {
        const card = this.state.card
        if (!card) return <div className="card-details-background"><div className="card-details-container"><CircularProgress /></div></div>
        return (
            <div className="card-details-background">
                <div className="card-details-container">
                    <div className="card-details-header-container">
                        <IconButton onClick={this.onCloseCard} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <div className="card-details-title-container">
                            <CardDetailsHeader headerTxt={card.title} onUpdate={this.onUpdateHeader} />
                            <small>in list <span>{this.state.groupName}</span></small>
                        </div>
                    </div>
                    <div className="card-details-attrs">
                        {this.getCardDetailsMembers()}
                        {this.getLabels()}
                        <div>
                            {(this.state.card.dueDate ? <h5>Due Date</h5> : <React.Fragment />)}
                            <CardDueDateSetter onUpdateDueDate={this.onUpdateDueDate} dueDate={card.dueDate} displayDate={true} displayTime={true} />
                        </div>
                    </div>
                    <section>
                        <main className="card-details-main">
                            <CardDescription onUpdateDesc={this.onUpdateDesc} description={card.description} />
                            <CardImagesList onUpdate={this.onUpdateAttachments} attachments={this.state.card.attachments} />
                            <CardChecklistList addActivity={this.addActivity} checklists={card.checklists} onUpdate={this.onUpdateChecklists} />
                            <CardImgUpload onAddImage={this.onAddImage} setUploading={this.setUploading} toggleOpen={this.toggleUploadDropzone} isOpen={this.state.isUploadZoneOpen} />
                            <div  className="card-details-activity-log">
                                <div className="card-details-activities-title">
                                    <ListIcon />
                                    <h5>Activities</h5>
                                    <Button onClick={this.toggleCommentsOnly}>{(this.state.commentsOnly) ? 'Show Details' : 'Hide Details'}</Button>
                                </div>
                                <CardAddComment onAddComment={this.onAddComment} />

                                <ActivityLog
                                    boardId={this.props.board._id}
                                    displayMode="card"
                                    activities={this.getFilteredActivities()} />
                            </div>
                        </main>
                        <aside  className="card-details-sidebar">
                            <CardSidebar  anchorRef={this.ref} addActivity={this.addActivity} isUploading={this.state.isUploading} toggleUploadDropzone={this.toggleUploadDropzone} toggleDisplayMembers={this.toggleDisplayMembers} dueDate={card.dueDate} toggleLabelPallete={this.toggleLabelPalette} onUpdateDueDate={this.onUpdateDueDate} onArchiveCard={this.onArchiveCard} onUpdateChecklists={this.onUpdateChecklists} />
                        </aside>
                    </section>

                </div>
                {this.state.isLabelPaletteShowing && <LabelPalette card={card} />}
                {this.state.isCardMemeberShown && <CardMembersList updateCardMembers={this.onUpdateCardMembers} anchorEl={this.ref} toggleList={this.toggleDisplayMembers} boardMembers={this.props.board.members} card={this.state.card} cardMembers={card.members} />}
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

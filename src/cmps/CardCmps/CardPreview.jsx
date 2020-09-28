import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SubjectOutlinedIcon from '@material-ui/icons/SubjectOutlined';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import { toggleFullLabels } from '../../store/actions/boardActions';
import { CardLabels } from './CardLabels';
import { CardPreviewDueDate } from './CardPreviewDueDate';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import { Draggable } from 'react-beautiful-dnd'
import { CardPreviewActions } from './CardPreviewActions';
// import { Avatar } from '@material-ui/core';
import { MemberPreview } from '../BoardHeader/MemberPreview';



class _CardPreview extends Component {

    state = {
        isEditing: false
    }

    ref = React.createRef()



    onSetEditing = () => {
        this.setState({ isEditing: true })
    }

    onSetNotEditing = () => {
        this.setState({ isEditing: false })
    }

    onOpenCardActions = (ev) => {
        ev.stopPropagation()
        this.onSetEditing()
    }
    getCardPreviewStyle = () => {
        const cardStyle = this.props.card.style
        if (!cardStyle || !Object.keys(cardStyle)) return <div></div>
        if (cardStyle.bgColor) return <div className="card-preview-style" style={{ backgroundColor: cardStyle.bgColor }}></div>
        return <div></div>
    }

    getCardPreviewMembers = () => {
        const cardMembers = this.props.card.members
        if (!cardMembers || !cardMembers.length) return <React.Fragment />
        
        // const cardMembersEl =  cardMembers.map((member, idx) => {
        //     const splitName = member.fullName.split(' ')
        //     const initials = splitName.map(name => name[0])
        //     return <div key={100 + idx} className="card-preview-member"><Avatar>{initials}</Avatar></div>
        // })

        const cardMembersEl = cardMembers.map((member,idx) => {
            return <MemberPreview key={idx} name={member.fullName} imgUrl={member.imgUrl} />
        })

        return <div className="card-preview-members">{cardMembersEl}</div>
    }

    getCardPreviewAttachments = () => {
        const cardAtt = this.props.card.attachments
        if (!cardAtt || !Object.keys(cardAtt) || !cardAtt.length) return null
        return <div key="0" className="card-preview-attr"><AttachFileOutlinedIcon style={{ fontSize: 16 }} /></div>
    }

    getCardPreviewHoldDesc = () => {
        const cardDesc = this.props.card.description
        if (!cardDesc || !Object.keys(cardDesc)) return null
        return <div key="1" className="card-preview-attr"><SubjectOutlinedIcon style={{ fontSize: 16 }} /></div>
    }

    getCardPreviewComments = () => {
        let activities =this.props.board.activities
        if (!activities) return null
        let cardComm = activities.filter(activity => activity.card.id === this.props.card.id)
        cardComm = cardComm.filter(activity => {
            if (activity.commentTxt) return activity
            return null
        })
        if (!cardComm || !cardComm.length) return null

        return <div key="3" className="card-preview-attr"><ChatBubbleOutlineRoundedIcon style={{ fontSize: 16 }} /> {cardComm.length}</div>
    }

    onOpenCardDetails = () => {
        // to later be switched to using history
    
        let url = window.location.href
        if (url.charAt(url.length - 1) !== '/') url += '/'
        url += `${this.props.card.id}`
        window.location.assign(url)
        
    }


    getCardPreviewChecklist = () => {
        const checklists = this.props.card.checklists
        if (!checklists || !checklists.length) return null

        let doneTodos = 0
        let totalTodos = 0

        let doneClass = ''

        checklists.forEach(checklist => {
            checklist.todos.forEach(todo => {
                if (todo.isDone) {
                    doneTodos += 1
                }
                totalTodos += 1
            })
        })

        if (!totalTodos) return null
        if (doneTodos === totalTodos) {
            doneClass = " card-preview-checklist-counter-done"
        }
        return <div key="2" className={`card-preview-attr card-preview-checklist-counter${doneClass}`}><CheckBoxOutlinedIcon style={{ fontSize: 16 }} /> <span>{doneTodos}/{totalTodos}</span> </div>
    }

    getCardPreviewAttrs = () => {
        // test all attributes
        const attrs = [
            this.getCardPreviewAttachments(),
            this.getCardPreviewHoldDesc(),
            this.getCardPreviewChecklist(),
            this.getCardPreviewComments()
        ]
        // if at least one of them is true OR there are members assing to this card - render the card-preview-attrs div
        if (this.getCardPreviewMembers() || !attrs.every(item => !item)) {
            return (<div className="card-preview-attrs">
                {attrs.map((att, idx) => {
                    if (att) return att
                    return <React.Fragment key={idx} />
                })}
            </div>)
        }
    }

    getCardCover = () => {

        const cardCover = this.props.card.cover
        if (!cardCover) return <React.Fragment />
        if (!cardCover.src) return (
            // if there is no src - this is a color
            <div className="card-preview-cover-color" style={{backgroundColor:cardCover.color}} />
        )
        return (
            <div className="card-preview-cover-image" style={{backgroundImage:`url(${cardCover.src})`}} /> 
        )
    }

    onToggleLabels = (ev) => {
        ev.stopPropagation()
        return this.props.toggleFullLabels()
    }

    componentDidMount = () => {
        // console.log(this.ref.current)

    }


    render() {        
        return (


            <Draggable draggableId={this.props.card.id} index={this.props.index}>
                {(provided, snapshot) => ( 
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={snapshot.isDragging ? '' : 'card-preview'}
                        onClick={this.onOpenCardDetails}>

                            <div className={snapshot.isDragging ? 'card-preview-drag' : ''}>
                                {this.getCardPreviewStyle()}
                                {this.getCardCover()}
                                <CardLabels onClickLabel={this.onToggleLabels}
                                    isFull={this.props.fullLabel}
                                    cardLabels={this.props.card.labels}
                                    boardLabels={this.props.board.labels}
                                    preview={true}
                                />
                                <div className="card-preview-header">
                                    {this.props.card.title}
                                </div>
                                <div ref={this.ref} onClick={this.onOpenCardActions} className="card-preview-edit-container">
                                    <EditOutlinedIcon fontSize="inherit" />
                                    {(this.state.isEditing) ? <CardPreviewActions anchorEl={this.ref} props={this.props} onClose={this.onSetNotEditing} cardStyle={this.getCardPreviewStyle()} attrs={this.getCardPreviewAttrs()} /> : <React.Fragment />}
                                </div>
                                <div className="card-preview-attrs">
                                    <CardPreviewDueDate dueDate={this.props.card.dueDate} />
                                    {this.getCardPreviewAttrs()}
                                    {this.getCardPreviewMembers()}
                                </div>
                                {provided.placeholder}
                            </div>
                    </div>
                )}

            </Draggable>
        )
    }
}


const mapStateToProps = state => {
    return {
        fullLabel: state.boardReducer.fullLabel,
        board: state.boardReducer.board
    };
};
const mapDispatchToProps = {
    toggleFullLabels
};

export const CardPreview = connect(mapStateToProps, mapDispatchToProps)(_CardPreview);


// className = {`
//      ${snapshot.isDragging ? 'check card-preview' : 'card-preview'}
//      ${snapshot.isDropAnimating ? 'yes' : ''}
//                         `}
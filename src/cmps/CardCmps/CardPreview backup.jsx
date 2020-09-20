import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SubjectOutlinedIcon from '@material-ui/icons/SubjectOutlined';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import { toggleFullLabels } from '../../store/actions/boardActions';
import { CardLabels } from './CardLabels';
import { CardPreviewDueDate } from './CardPreviewDueDate';


class _CardPreview extends Component {

    state = {
        isEditing: false
    }


    onSetEditing = () => {
        this.setState({ isEditing: true })
    }

    getCardPreviewStyle = () => {
        const cardStyle = this.props.card.style
        if (!cardStyle || !Object.keys(cardStyle)) return <div></div>
        if (cardStyle.bgColor) return <div className="card-preview-style" style={{ backgroundColor: cardStyle.bgColor }}></div>
        return <div></div>
    }

    getCardPreviewAttachments = () => {
        const cardAtt = this.props.card.attachments
        if (!cardAtt || !Object.keys(cardAtt)) return null
        return <div key="0" className="card-preview-attr"><AttachFileOutlinedIcon style={{ fontSize: 16 }} /></div>
    }

    getCardPreviewHoldDesc = () => {
        const cardDesc = this.props.card.description
        if (!cardDesc || !Object.keys(cardDesc)) return null
        return <div key="1" className="card-preview-attr"><SubjectOutlinedIcon style={{ fontSize: 16 }} /></div>
    }

    onOpenCardDetails = () => {
        // to later be switched to using history

        let url = window.location.href
        url += `${this.props.card.id}`
        window.location.assign(url)
    }


    getCardPreviewChecklist = () => {
        const checklists = this.props.card.checklists
        if (!checklists || !Object.keys(checklists)) return null

        let doneTodos = 0
        let totalTodos = 0

        checklists.forEach(checklist => {
            checklist.todos.forEach(todo => {
                if (todo.isDone) {
                    doneTodos += 1
                }
                totalTodos += 1
            })
        })
        return <div key="2" className="card-preview-attr"><CheckBoxOutlinedIcon style={{ fontSize: 16 }} /> <span className="card-preview-checklist-counter">{doneTodos}/{totalTodos}</span> </div>
    }
    getCardPreviewAttrs = () => {
        const attrs = [
            this.getCardPreviewAttachments(),
            this.getCardPreviewHoldDesc(),
            this.getCardPreviewChecklist()
        ]
        if (!attrs.every(item => !item)) {
            return (<div className="card-preview-attrs">
                {attrs.map(att => {
                    if (att) return att
                })}
            </div>)
        }
    }

    onToggleLabels = (ev) => {
        ev.stopPropagation()
        return this.props.toggleFullLabels()
    }

    render() {
        return (
            <div 
                className={'card-preview'} 
                onClick={this.onOpenCardDetails}>
                {this.getCardPreviewStyle()}
                <CardLabels onClickLabel={this.onToggleLabels}
                    isFull={this.props.fullLabel}
                    cardLabels={this.props.card.labels}
                    boardLabels={this.props.board.labels}
                    preview={true}
                />
                <div className="card-preview-header">
                    {this.props.card.title}
                </div>
                <div className="card-preview-edit-container">
                    <EditOutlinedIcon />
                </div>
                <div className="card-preview-attrs">
                <CardPreviewDueDate dueDate={this.props.card.dueDate} />
                {this.getCardPreviewAttrs()}
                </div>
            </div>
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

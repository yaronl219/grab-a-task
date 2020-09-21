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

class _CardPreviewActions extends Component {

    state = {
        isOpen: false,
        offsetTop: null,
        offsetLeft: null,
        width: null,
        txtValue: ''
    }

    submitCard = async (card) => {
        await this.props.updateCard(this.props.board, card)
        this.onClose()
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
        await this.addActivity('updated due date')
        this.setState({ card }, () => this.submitCard(card))
    }

    onUpdateHeader = async () => {
        let card = { ...this.props.props.card }
        console.log(card)
        card.title = this.state.txtValue
        await this.addActivity('updated the title')
        this.setState({ card }, () => this.submitCard(card))

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


    onArchiveCard = async () => {
        let card = { ...this.props.props.card }
        card.archivedAt = Date.now()
        await this.addActivity('archived')
        this.submitCard(card)
    }

    getParentPos = () => {
        const width = this.props.anchorEl.current.parentElement.offsetWidth
        const offsetTop = this.props.anchorEl.current.parentElement.offsetTop
        const offsetLeft = this.props.anchorEl.current.parentElement.offsetLeft
        this.setState({ offsetTop, offsetLeft, width })
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
                <div className="card-edit-container" onClick={(ev) => ev.stopPropagation()} style={{
                    left: `${this.state.offsetLeft}px`,
                    top: `${this.state.offsetTop}px`,
                    position: 'fixed'
                }}>
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
                    <div className="card-edit-right">
                        <div className="card-preview-edit-actions-container">
                        <Button onClick={this.onArchiveCard}><ArchiveOutlinedIcon /> <span>Archive Card</span></Button>
                            <CardDueDateSetter dueDate={props.dueDate} onUpdateDueDate={this.onUpdateDueDate}/>
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

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardPreview } from './CardCmps/CardPreview'
import { NewItem } from './NewItem'
import { addCard } from '../store/actions/groupActions'
import { setNewGroupName } from '../store/actions/boardActions'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { GroupMenu } from './GroupCmps/GroupMenu'
import { ClickAwayListener } from '@material-ui/core'

class _Group extends Component {

    state = {
        currGroupName: '',
        currGroupId: null,
        isMenuShown: false,
        isChangeGroupShown: false
    }

    onAddCard = (txt) => {
        return this.props.addCard(this.props.board, txt, this.props.group.id)
    }

    getAddItemTxt = () => {
        if (this.props.group.cards.length) return 'Add another card'
        return 'Add a card'
    }

    toggleMenu=(ev = null)=>{
        if (ev) ev.stopPropagation()
        const isShown = !this.state.isMenuShown
        this.setState({ isMenuShown: isShown })
        
    }

    closeChangeGroupName = (ev) => {
        this.setState({ isChangeGroupShown: false })
        this.onSubmit(ev)
    }

    onOpenChangeGroupName=(id, groupName)=>{
        this.setState({ currGroupId: id, currGroupName: groupName, isChangeGroupShown: true })
    }

    handleChangeGroupName=(ev)=>{
        this.setState({ currGroupName: ev.target.value })
    }

    onSubmit=(ev)=>{
        ev.preventDefault()        
        const { currGroupId, currGroupName } = this.state
        this.props.setNewGroupName(currGroupId, currGroupName, this.props.board)
        this.setState({ isChangeGroupShown: false })
    }

    render() {
        const group = this.props.group
        return (
            <Draggable draggableId={group.id} index={this.props.index}>
                {(provided, snapshot)=>(
                    <div {...provided.draggableProps} ref={provided.innerRef}
                        className={snapshot.isDragging ? '' : 'group-outer-container'}>
                        <div className={snapshot.isDragging ? 'group-container-drag' : 'group-container' }>
                        <div {...provided.dragHandleProps}
                            className="group-header" onClick={()=> this.onOpenChangeGroupName(group.id, group.title) }>
                            {(this.state.isChangeGroupShown) ? 
                                <ClickAwayListener onClickAway={this.closeChangeGroupName}>
                                    <form onSubmit={this.onSubmit} className="change-group-name">
                                        <input className="change-group-name-input" 
                                        type="text" name="group-name" onChange={this.handleChangeGroupName} 
                                        defaultValue={ group.title }
                                        autoFocus spellCheck="false" autoComplete="off"
                                        onFocus={ev => ev.target.select()}
                                        />  
                                    </form>
                                </ClickAwayListener> : (group.title)}

                            <span onClick={ this.toggleMenu } className="material-icons dots-icon">more_horiz</span>
                            {this.state.isMenuShown && <GroupMenu toggleMenu={this.toggleMenu} groupId={group.id} 
                            onAdd={this.onAddCard}/>}

                        </div>
                        <Droppable droppableId={group.id} type="card">
                        {(provided, snapshot)=>(
                                <div className="card-container"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}>
                                    {group.cards.map((card, index) => {
                                        if (!card.archivedAt) {
                                            return <CardPreview key={card.id} card={card} index={index}/>
                                        }
                                    })}
                                    {provided.placeholder}
                                </div>
                        )}
                        </Droppable>
                        <div className="new-card-btn-container">
                            <NewItem addItemTxt={this.getAddItemTxt()} placeHolderTxt='Add a title for this card...' addBtnTxt="Add Card" onAdd={this.onAddCard} />
                        </div>
                        </div>
                     </div>


                )}
            </Draggable>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardReducer.board
    };
};
const mapDispatchToProps = {
    addCard,
    setNewGroupName
};

export const Group = connect(mapStateToProps, mapDispatchToProps)(_Group);

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardPreview } from './CardCmps/CardPreview'
import { NewItem } from './NewItem'
import { addCard } from '../store/actions/groupActions'
import { CardList } from './CardCmps/CardList'

import { Droppable, Draggable } from 'react-beautiful-dnd'
import { GroupMenu } from './GroupCmps/GroupMenu'


class _Group extends Component {

    state = {
        isMenuShown: false
    }

    onAddCard = (txt) => {
        return this.props.addCard(this.props.board, txt, this.props.group.id)
    }

    getAddItemTxt = () => {
        if (this.props.group.cards.length) return 'Add another card'
        return 'Add a card'
    }

    toggleMenu=()=>{
        this.setState({ isMenuShown: !this.state.isMenuShown })
    }

    render() {
        const group = this.props.group
        return (
            <Draggable draggableId={group.id} index={this.props.index}>
                {provided=>(
                    <div {...provided.draggableProps} ref={provided.innerRef}
                        className="group-container">
                        <div {...provided.dragHandleProps}
                            className="group-header">
                            {group.title}

                            <span onClick={ this.toggleMenu } className="material-icons dots-icon">more_horiz</span>
                            {this.state.isMenuShown && <GroupMenu toggleMenu={this.toggleMenu} groupId={group.id} 
                            onAdd={this.onAddCard}/>}

                        </div>
                        <Droppable droppableId={group.id} type="card">
                        {provided=>(
                                <div className="card-container"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                >
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
    addCard
};

export const Group = connect(mapStateToProps, mapDispatchToProps)(_Group);

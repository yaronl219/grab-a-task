import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardPreview } from './CardCmps/CardPreview'
import { NewItem } from './NewItem'
import { addCard } from '../store/actions/groupActions'
import { CardList } from './CardCmps/CardList'

import { Droppable, Draggable } from 'react-beautiful-dnd'

class _Group extends Component {


componentDidMount() {
    console.log('yes');

}

    onAddCard = (txt) => {
        this.props.addCard(this.props.board, txt, this.props.group.id)
    }

    getAddItemTxt = () => {
        if (this.props.group.length) return 'Add another card'
        return 'Add a card'
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

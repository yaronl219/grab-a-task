import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardPreview } from './CardCmps/CardPreview'
import { NewItem } from './NewItem'
import { addCard } from '../store/actions/groupActions'
class _Group extends Component {

    componentDidMount() {
        console.log(this.props)
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
            <div className="group-container">
                <div className="group-header">
                    {group.title}
                </div>
                <div className="card-container">
                    {group.cards.map(card => <CardPreview key={card.id} card={card} />)}
                </div>
                <div className="new-card-btn-container">
                <NewItem addItemTxt={this.getAddItemTxt()} placeHolderTxt='Add a title for this card...' addBtnTxt="Add Card" onAdd={this.onAddCard} />
                </div>
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
    addCard
};

export const Group = connect(mapStateToProps, mapDispatchToProps)(_Group);

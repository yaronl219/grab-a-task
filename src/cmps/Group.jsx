import React, { Component } from 'react'
import { CardPreview } from './CardCmps/CardPreview'
import { NewItem } from './NewItem'

export class Group extends Component {

    componentDidMount() {
    // console.log(this.props)
}

    onAddCard = (txt) => {
        console.log(txt)
    }

    getAddItemTxt = () => {
        if (this.props.group.length) return 'Add another card'
        return 'Add a card'
    }

    render() {
        const group = this.props.group
        return (
            <div>
                <div className="group-header">
                    {group.title}
                </div>
                <div className="card-container">
                    {group.cards.map(card => <CardPreview key={card.id} card={card} />)}
                </div>
                <NewItem addItemTxt={this.getAddItemTxt()} placeHolderTxt='Add a title for this card...' addBtnTxt="Add Card" onAdd={this.onAddCard} />
            </div>
        )
    }
}

import React from 'react'
import { CardPreview } from './CardPreview'

export function CardList(props) {
    return (
        <div>
            {props.group.cards.map(card => {
                if (!card.archivedAt) {
                    return <CardPreview key={card.id} card={card} />}
                }
            )
        }
        </div>
    )
}

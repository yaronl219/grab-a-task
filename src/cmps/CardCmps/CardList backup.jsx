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


{/* <Droppable droppableId={groups.id}>{(provided) => (
    <div innerRef={provided.innerRef}
        {...provided.droppableProps}
        className="group-list-container" style={{
            backgroundImage: style.bgImg,
            color: style.fontClr
        }}>
        {groups.map(group => {
            if (!group.archivedAt) {
                return <Group key={group.id} group={group} />
            }
        })}
        {provided.placeholder}
    </div>
)}
</Droppable> */}
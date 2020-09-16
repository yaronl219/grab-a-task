import React from 'react'
import { connect } from 'react-redux'
import { Group } from './Group'
import { NewItem } from './NewItem'

export function GroupList({ groups, onAddGroup}) {


    if (!groups) return <div></div>
    return (
        <div className="group-list-container">
            {groups.map(group => {
                if (!group.archivedAt) {
                    return <Group key={group.id} group={group} /> 
                }
            })}
            <div className="check">
            <NewItem addItemTxt="Add another list"
                placeHolderTxt="Enter lists title"
                addBtnTxt="Add list"
                onAdd={onAddGroup}
            />
            </div>
        </div>
    )
}

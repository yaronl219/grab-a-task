import React from 'react'
import { connect } from 'react-redux'
import { Group } from './Group'

export function GroupList({groups}) {
    console.log(groups)
    if (!groups) return <div></div>
    return (
        <div>
            {groups.map(group => {
                if (!group.archivedAt) {
                    return <Group key={group.id} group={group} /> 
                }
            })}
        </div>
    )
}

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Group } from './Group'
import { NewItem } from './NewItem'
import { AddNewGroup } from './GroupCmps/AddNewGroup'
// import { render } from '@testing-library/react'

import { Droppable } from 'react-beautiful-dnd'


export class GroupList extends Component {

    state = {
        isNewGroupShown: false
    }

    closeNewGroup = () => {
        this.setState({ isNewGroupShown: false })
    }

    render() {

        const { groups, onAddGroup, style } = this.props
        if (!groups) return <div></div>

        return (
            <div className="group-list-outer-container" >
                    <Droppable droppableId="changeToBoardId" direction="horizontal" type="group">
                        {provided=> (
                        <div {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="group-list-container" >
                            {groups.map((group, index) => {
                                if (!group.archivedAt) {
                                    return <Group key={group.id} group={group} index={index}/>
                                }
                        })}
                        </div>
                        )}
                    </Droppable>
                    <div className="new-group" >
                        {!this.state.isNewGroupShown && <div className="add-new-group-text"
                            onClick={() => this.setState({ isNewGroupShown: true })}>+ Add another list</div>}
                        {this.state.isNewGroupShown && <AddNewGroup closeNewGroup={this.closeNewGroup} />}
                    </div>
                </div>
        )
    }
}

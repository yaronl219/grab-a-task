import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Group } from './Group'
import { NewItem } from './NewItem'
// import { render } from '@testing-library/react'

export class GroupList extends Component {


    render() {

        const { groups, onAddGroup, style } = this.props
        if (!groups) return <div></div>
        return (
            <React.Fragment>
                <div className="group-list-container" style={{
                    backgroundImage: style.bgImg,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}>
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
            </React.Fragment>
        )
    }
}

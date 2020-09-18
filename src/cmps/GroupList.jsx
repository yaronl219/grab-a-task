import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Group } from './Group'
import { NewItem } from './NewItem'
import { AddNewGroup } from './BoardHeader/GroupCmps/AddNewGroup'
// import { render } from '@testing-library/react'

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


                    <div className="new-group" >
                        {!this.state.isNewGroupShown && <div className="add-new-group-text" 
                        onClick={() => this.setState({ isNewGroupShown: true })}>+ Add another list</div>}
                        
                        {this.state.isNewGroupShown && <AddNewGroup closeNewGroup={ this.closeNewGroup }/>}
                    </div>


                </div>
            </React.Fragment>
        )
    }
}






/* <div className="new-group">
                        <NewItem addItemTxt="Add another list"
                            placeHolderTxt="Enter lists title"
                            addBtnTxt="Add list"
                            onAdd={onAddGroup}
                        />
                    </div> */
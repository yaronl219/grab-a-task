// this contains:
// Board name
// Board Members
// Filter (search)
// Link to Statistics
// Menu hamburger

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { MemberList } from './MemberList';
import { Filter } from './Filter';



export class _BoardHeader extends Component {
    render() {
        
        return (
            <div className="boards-header-container">
                <h3>{this.props.title}</h3>
                <div className="members-container">
                    <MemberList members={this.props.members}/>
                </div>
                <Filter onFilter={this.props.onFilter}/>
                <div className="side-menu-btn"><button>Side Menu</button></div>
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

};

export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardHeader);

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
import { Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';


export class _BoardHeader extends Component {


    render() {
        const { style } = this.props;
        console.log(style)
        return (
            (!style) ? <div>Loading...</div> :
                <div className="boards-header-container" style={{ backgroundColor: this.props.style.bgClr }}>
                    <h3>{this.props.title}</h3>
                    <div className="members-container">
                        <MemberList members={this.props.members} />
                    </div>
                    <Filter onFilter={this.props.onFilter} />
                    <Button onClick={() => this.props.onToggleSidebar(true)}>
                        <MenuIcon />
                    </Button>

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

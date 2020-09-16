import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Filter } from '../BoardHeader/Filter'
import { AboutBoard } from './AboutBoard'
import { ChangeBackground } from './ChangeBackground'
import SideArchive from './SideArchive'


export class _Sidebar extends Component {
    state = {
        showing: 'menu'
    }

    render() {
        const { board } = this.props;
        const { showing } = this.state;
        const style = {
            zIndex: 1,
            position: 'absolute',
            top: '0',
            right: '0',
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid black',
            height: '90vh',
            width: '20vh'
        }
        console.log(board)
        return (
            <div className="sidebar" style={style}>
                {showing === 'menu' && <div className="menu" style={{ display: 'flex', flexDirection: 'column' }}>
                    <h3>Menu</h3>
                    <button onClick={() => this.setState({ showing: 'about' })}>
                        About this page
                    </button>
                    <button onClick={() => this.setState({ showing: 'changeBG' })}>
                        Change background
                    </button>
                    <button onClick={() => this.setState({ showing: 'searchCards' })}>
                        Search cards
                    </button>
                    <button onClick={() => this.setState({ showing: 'archive' })}>
                        Archive
                    </button>
                </div>}
                {showing === 'about' && <AboutBoard
                    about={board.about}
                    createdBy={board.createdBy}
                    members={board.members}
                    onBackToMenu={() => this.setState({ showing: 'menu' })} />}
                {showing === 'changeBG' && <ChangeBackground
                    onBackToMenu={() => this.setState({ showing: 'menu' })} />}
                {showing === 'searchCards' && <Filter
                    onBackToMenu={() => this.setState({ showing: 'menu' })} />}
                {showing === 'archive' && <SideArchive
                    onBackToMenu={() => this.setState({ showing: 'menu' })} />}

            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        board: state.boardReducer.board
    };
};

export const Sidebar = connect(mapStateToProps)(_Sidebar);

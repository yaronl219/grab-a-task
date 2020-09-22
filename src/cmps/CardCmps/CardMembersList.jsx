import { CircularProgress, Popover } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import React, { Component } from 'react'
import { CardMember } from './CardMember';

export class CardMembersList extends Component {

    state = {
        boardMembers: [],
        filter: ''
    }

    componentDidMount() {
        this.filterBoardMembers()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.boardMembers !== this.props.boardMembers || prevProps.card.members !== this.props.card.members || prevState.filter !== this.state.filter) this.filterBoardMembers()
    }

    filterBoardMembers = () => {
        const filteredMembers = this.props.boardMembers.filter(member => member.fullName.toLowerCase().includes(this.state.filter.toLowerCase()))

        this.setState({ boardMembers: filteredMembers })
    }

    onChange =(ev) => {
        this.setState({filter:ev.target.value})
    }

    onSelectBoardMember = (member,shouldAdd) => {
        let txt = ''
        console.log(member,shouldAdd)
        const card = {...this.props.card}
        if (shouldAdd) {
            card.members.push(member)
            txt = `added ${member.fullName}`
        } else {
            card.members = card.members.filter(cardMember => cardMember._id !== member._id)
            txt = `removed ${member.fullName}`
        }
        this.props.updateCardMembers(card,txt)
    }

    render() {
        if (!this.state.boardMembers) return <CircularProgress />
        return (
            <div>
                <Popover
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={true}
                    anchorEl={this.props.anchorEl.current}
                    onClose={this.props.toggleList}
                    onBackdropClick={this.props.toggleList}
                >
                    <div className="card-members-list">
                        <div className="card-members-list-header">
                            <div>Members</div>
                            <CloseIcon onClick={this.props.toggleList} />
                        </div>
                        
                        <input type="text" value={this.state.filter} onChange={this.onChange} className="filter" />
                        <div className="board-members">
                            <h5>Board Members</h5>
                            {this.state.boardMembers.map(member => {
                                return <CardMember key={member._id} boardMember={member} cardMembers={this.props.card.members} toggleMember={this.onSelectBoardMember}/>
                            })}
                        </div>
                    </div>
                </Popover>
            </div>
        )
    }
}


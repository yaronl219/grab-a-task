import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Drawer, Divider, IconButton } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import { loadBoard, updateCard } from '../../store/actions/boardActions.js';

export class _SideArchive extends Component {
    state = { isShowingCards: true }
    async componentDidMount() {
        await this.props.loadBoard('b101');
    }
    onOpenCardDetails = (cardId) => {
        // to later be switched to using history

        let url = window.location.href
        url += cardId
        window.location.assign(url)
    }
    onUnArchiveCard = (card) => {
        card.archivedAt = null;
        this.props.updateCard(this.props.board, card);
    }
    render() {
        const { board, isShowing, onSetMenuOpt } = this.props;
        const anchor = 'right';
        if (!board.groups) return <div>Loading...</div>;
        let archivedCards = board.groups.filter(group => {
            return group.cards.find(card => card.archivedAt)
        });
        archivedCards = archivedCards.map(group => {
            if (group.archivedAt) return group;
            return { ...group, cards: group.cards.filter(card => card.archivedAt) };
        });
        let archivedGroups = board.groups.filter(group => group.archivedAt)
        return (
            <div className="archive sidebar-container" >
                <Drawer classes={{ root: 'sidebar' }}
                    anchor={anchor}
                    open={isShowing}
                    BackdropProps={{ hideBackdrop: true }}
                    variant={'persistent'}>
                    <div className="sidebar-header">
                        <h4>ARCHIVE</h4>
                        <IconButton className="icon-button"
                            onClick={() => onSetMenuOpt(null)}>
                            <ArrowBackIosOutlinedIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <button
                        onClick={() => this.setState({ isShowingCards: !this.state.isShowingCards })}>
                        Switch to {(this.state.isShowingCards) ? 'groups' : 'cards'}
                    </button>
                    <div className="archive-list-container">
                        {(this.state.isShowingCards)
                            ? archivedCards.map(group => {
                                if (group.cards.length === 0) return;
                                return <React.Fragment key={group.id}>
                                    <h5>{group.title}</h5>
                                    {group.cards.map(card => {
                                        return <div className="archive-card-container"
                                            key={card.id}>
                                            <div className="archive-card-preview"
                                                onClick={() => this.onOpenCardDetails(card.id)}>
                                                <span>{card.title}</span>
                                            </div>
                                            <div className="buttons">
                                                <IconButton onClick={() => this.onUnArchiveCard(card)}>
                                                    <UnarchiveIcon fontSize='small'
                                                    />
                                                </IconButton>
                                                <IconButton>
                                                    <CloseOutlinedIcon fontSize='small' />
                                                </IconButton>
                                            </div>
                                        </div>
                                    })
                                    }
                                </React.Fragment>
                            })
                            : <div>groups</div>
                        }
                    </div>
                </Drawer>
            </div >
        )
    }
}
const mapStateToProps = state => {
    return {
        board: state.boardReducer.board
    };
};
const mapDispatchToProps = {
    loadBoard,
    updateCard
};

export const SideArchive = connect(mapStateToProps, mapDispatchToProps)(_SideArchive);

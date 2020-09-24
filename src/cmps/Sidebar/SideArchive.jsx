import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Drawer, Divider, IconButton } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined';
import { loadBoard, updateCard, deleteCard, updateGroup } from '../../store/actions/boardActions.js';
import { SidebarHeader } from './SidebarHeader.jsx';

export class _SideArchive extends Component {
    state = {
        isShowingCards: true,
        archive: { archivedCards: [], archivedGroups: [] },
        filterBy: ''
    }
    async componentDidMount() {
        this.loadArchive();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.board !== this.props.board) this.loadArchive();
    }
    loadArchive = () => {
        const { filterBy } = this.state;
        const { board } = this.props;
        let archivedCards = board.groups.filter(group => {
            return group.cards.find(card => card.archivedAt)
        });
        archivedCards = archivedCards.map(group => {
            return {
                ...group,
                cards: group.cards.filter(card => {
                    return card.archivedAt
                        && (card.title.toLowerCase().includes(filterBy.toLowerCase())
                            || card.description.toLowerCase().includes(filterBy.toLowerCase()));
                })
            };
        });
        const archivedGroups = board.groups.filter(group => {
            return group.archivedAt && group.title.toLowerCase().includes(filterBy.toLowerCase())
        });
        this.setState({ archive: { archivedCards, archivedGroups } });
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
    onDeleteCard = (cardId) => {
        this.props.deleteCard(this.props.board, cardId);
    }
    onUnArchiveGroup = (group) => {
        group.archivedAt = null;
        this.props.updateGroup(this.props.board, group);
    }
    onFilter = (ev) => {
        const filterBy = ev.target.value;
        this.setState(() => ({ filterBy }), () => this.loadArchive());
    }
    render() {
        const { board, isShowing, onSetMenuOpt } = this.props;
        const { isShowingCards, archive } = this.state;
        if (!board.groups) return <div>Loading...</div>;

        return (
            archive && <div className="archive sidebar-container">
                <Drawer classes={{ root: 'sidebar' }}
                    anchor={'right'}
                    open={isShowing}
                    BackdropProps={{ hideBackdrop: true }}
                    variant={'persistent'}>
                    <SidebarHeader titleTxt="ARCHIVE" onSetMenuOpt={onSetMenuOpt} />
                    <div className="search-archive-container">
                        <input type="text" onChange={(ev) => this.onFilter(ev)} />
                        <button
                            className="toggle-archive-btn"
                            onClick={() => {
                                this.setState({
                                    isShowingCards: !this.state.isShowingCards,
                                    filterBy: ''
                                });
                            }}>
                            Switch to {(isShowingCards) ? 'groups' : 'cards'}
                        </button>
                    </div>
                    <div className="archive-list-container">
                        {isShowingCards
                            ? archive.archivedCards.map(group => {
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
                                                    <UnarchiveOutlinedIcon fontSize='small' />
                                                </IconButton>
                                                <IconButton onClick={() => this.onDeleteCard(card.id)}>
                                                    <DeleteOutlinedIcon fontSize='small' />
                                                </IconButton>
                                            </div>
                                        </div>
                                    })}
                                </React.Fragment>
                            })
                            : archive.archivedGroups.map(group => <React.Fragment key={group.id}>
                                <div className="archive-group-preview">
                                    <h5>{group.title}</h5>
                                </div>
                                <div className="buttons">
                                    <IconButton onClick={() => this.onUnArchiveGroup(group)}>
                                        <UnarchiveOutlinedIcon fontSize='small'
                                        />
                                    </IconButton>
                                    <IconButton>
                                        <DeleteOutlinedIcon fontSize='small' />
                                    </IconButton>
                                </div>
                            </React.Fragment>)
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
    updateCard,
    deleteCard,
    updateGroup
};

export const SideArchive = connect(mapStateToProps, mapDispatchToProps)(_SideArchive);

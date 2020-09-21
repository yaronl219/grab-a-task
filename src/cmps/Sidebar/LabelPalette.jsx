import React, { Component } from 'react'
import { connect } from 'react-redux';
import { IconButton } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import CheckIcon from '@material-ui/icons/Check';
import { addLabel, updateLabel, removeLabel } from '../../store/actions/boardActions.js';
import { LabelEditModal } from './LabelEditModal.jsx';


class _LabelPalette extends Component {
    state = {
        labelEditId: null
    }
    setLabelEditId = (labelEditId = null) => {
        this.setState({ labelEditId });
    }
    onAddLabel = (ev) => {
        ev.preventDefault();
        const newLabel = {
            name: ev.target.labelName.value,
            color: ev.target.newColor.value
        }
        this.props.addLabel(this.props.board, newLabel);
        this.setLabelEditId();
    }
    onEditLabel = (ev, label) => {
        ev.preventDefault();
        const labelName = ev.target.labelName.value;
        const labelColor = ev.target.newColor.value;
        const updatedLabel = { ...label, name: labelName, color: labelColor }
        this.props.updateLabel(this.props.board, updatedLabel);
        this.setLabelEditId();
    }
    onRemoveLabel = (labelId) => {
        this.props.removeLabel(this.props.board, labelId);
        this.setLabelEditId();
    }
    onToggleLabelToCard = (labelId) => {
        console.log('hello', labelId)
    }
    render() {
        const { board, card } = this.props;
        return (
            board.labels
                ? <ul className="label-palette">
                    {board.labels.map(label => <li key={label.id} className="label">
                        <div className={`label-color ${label.color}`}
                            onClick={card
                                ? () => this.onToggleLabelToCard(label.id)
                                : () => this.setLabelEditId(
                                    this.state.labelEditId === label.id
                                        ? null
                                        : label.id
                                )}>
                            <span className="label-text">{label.name}</span>
                            {card && card.labels.find(cardLabel => cardLabel.id === label.id) && <CheckIcon fontSize="small" />}
                        </div>
                        <IconButton className="edit-label-btn" onClick={() => this.setLabelEditId(
                            this.state.labelEditId === label.id
                                ? null
                                : label.id
                        )}>
                            <EditOutlinedIcon fontSize='small' />
                        </IconButton>
                        {this.state.labelEditId === label.id && <LabelEditModal
                            label={label}
                            action={this.onEditLabel}
                            setLabelEditId={this.setLabelEditId} />}
                    </li>)}
                    <li className="label add-label">
                        <div className="label-color add-label"
                            onClick={() => this.setLabelEditId(
                                this.state.labelEditId === 'addLabel'
                                    ? null
                                    : 'addLabel'
                            )}>
                            <div>Create a new label</div>
                        </div>
                        {this.state.labelEditId === 'addLabel' && <LabelEditModal
                            action={this.onAddLabel}
                            setLabelEditId={this.setLabelEditId} />}
                    </li>
                </ul>
                : <div>Loading...</div>
        )
    }
}
const mapStateToProps = state => {
    return {
        board: state.boardReducer.board
    };
};
const mapDispatchToProps = {
    addLabel,
    updateLabel,
    removeLabel
};
export const LabelPalette = connect(mapStateToProps, mapDispatchToProps)(_LabelPalette);

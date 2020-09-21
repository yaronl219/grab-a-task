import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Drawer, Divider, IconButton } from '@material-ui/core';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { addLabel, updateLabel, removeLabel } from '../../store/actions/boardActions.js';
import { LabelPalette } from './LabelPalette.jsx';

class _LabelPanel extends Component {
    render() {
        const { isShowing, onSetMenuOpt } = this.props;
        return (
            <div className="sidebar-container" >
                <Drawer classes={{ root: 'sidebar' }}
                    className="label-panel"
                    anchor={'right'}
                    open={isShowing}
                    BackdropProps={{ hideBackdrop: true }}
                    variant={'persistent'}>
                    <div className="sidebar-header">
                        <h4>LABELS</h4>
                        <IconButton size="small" onClick={() => onSetMenuOpt(null)}>
                            <ArrowBackIosOutlinedIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <LabelPalette />
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
    addLabel,
    updateLabel,
    removeLabel
};
export const LabelPanel = connect(mapStateToProps, mapDispatchToProps)(_LabelPanel);

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Label } from './Label'
import { onSetFilterBy } from '../../store/actions/boardActions'
import { ClickAwayListener } from '@material-ui/core'
export class _FilterByLabel extends Component {

    onFilterByLabel=(labelId)=>{
        // if theres filter and it is txt
        if (this.props.currFilter && this.props.currFilter.filterBy.txt) return

        let labels = []
        // if theres filter and is of labels type
        if (this.props.currFilter && this.props.currFilter.filterBy.labels) {
            labels = [...this.props.currFilter.filterBy.labels]
            // if you the idx is -1, than add it to the labels array
            const labelIdx = labels.findIndex(label => label === labelId)
            if (labelIdx !== -1) {labels.splice(labelIdx,1)}
            else if (labelIdx === -1) {labels.push(labelId)}
        } else {
            labels.push(labelId)
        }
        this.props.onSetFilterBy(this.props.board, { labels })
    }

    isChecked(labelId){
        // check if there are currently labels in the filter
        if (!this.props.currFilter || !this.props.currFilter.filterBy.labels) return
        let labels = [...this.props.currFilter.filterBy.labels]
        const labelIdx = labels.findIndex(label => label === labelId)
        if(labelIdx !== -1) return true
        else return false
    }

    onResetFilter = () => {
        const labels = []
        this.props.onSetFilterBy(this.props.board, { labels })
    }

    render() {
        const { labels } = this.props.board
        return (
            <ClickAwayListener onClickAway={this.props.toggleModal}>
            <div className="label-filter">
                <h3>Labels</h3>
                <div className="labels-container">

                    <div className="label-inner-container"
                        onClick={() => this.onResetFilter()}>
                        <div className={`label grey`}></div>
                        <p>No labels</p>
                    </div>
                    
                    {labels.map(label => {
                        return <Label name={label.name} 
                        color={label.color} 
                        id={label.id} 
                        key={ label.id }
                        onFilterByLabel={  this.onFilterByLabel }
                        isChecked={this.isChecked(label.id) }
                        />
                    })}
                </div>
            </div>
            </ClickAwayListener>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardReducer.board,
        currFilter: state.boardReducer.filterBy
    };
};

const mapDispatchToProps = {
    onSetFilterBy
};

export const FilterByLabel = connect(mapStateToProps, mapDispatchToProps)(_FilterByLabel);

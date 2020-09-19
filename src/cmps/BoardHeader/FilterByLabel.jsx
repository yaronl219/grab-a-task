import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Label } from './Label'
import { onSetFilterBy } from '../../store/actions/boardActions'

export class _FilterByLabel extends Component {

    state = {
        selectedLabels: []
    }

    onFilterByLabel=(labelId)=>{

        let labels = []      

        if (this.state.selectedLabels.length) {
            labels = [...this.state.selectedLabels]
            // if you the idx is -1, than no label is inside than add it
            const labelIdx = labels.findIndex(label => label === labelId)
            if (labelIdx !== -1) {labels.splice(labelIdx,1)}
            else if (labelIdx === -1) {labels.push(labelId)}
            this.setState({ selectedLabels: labels })

        } else {
            labels.push(labelId)
            this.setState({ selectedLabels: labels })
        }
        
        // this one sets the filter
        // need to send the array
        // this.props.onSetFilterBy(this.props.board, { labelId })
    }

    isChecked(labelId){

        let labels = [...this.state.selectedLabels]
        const labelIdx = labels.findIndex(label => label === labelId)
        if(labelIdx !== -1) return true
        else return false
    }

    onResetFilter = () => {
        const resetFilter = []
        this.setState({ selectedLabels: resetFilter })
    }

    render() {
        const { labels } = this.props.board
        return (
            <div className="label-filter">
                <button onClick={this.props.toggleModal}>x</button>
                <h3>LABELS</h3>
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

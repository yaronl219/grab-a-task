import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Label } from './Label'
import { onSetFilterBy } from '../../store/actions/boardActions'

export class _FilterByLabel extends Component {

    onFilterByLabel=(labelId)=>{
        console.log(this.props.currFilter)
        this.props.onSetFilterBy(this.props.board, { labelId })
    }
 
    render() {
        const { labels } = this.props.board
        return (
            <div className="label-filter">
                <button onClick={this.props.toggleModal}>x</button>
                <h3>LABELS</h3>
                <div className="labels-container">
                    {labels.map(label => {
                        return <Label name={label.name} 
                        color={label.color} 
                        id={label.id} 
                        key={ label.id }
                        onFilterByLabel={  this.onFilterByLabel }
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

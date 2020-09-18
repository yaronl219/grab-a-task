import React from 'react'

export function CardLabels(props) {
    if (!props.cardLabels) return <React.Fragment />
    
    function displayLabel(label) {
        const boardLabel = props.boardLabels.find(boardLabel => boardLabel.id === label.id)
        if (!props.preview) return (
            <div className="card-details-label" style={{ backgroundColor: boardLabel.color }}>
                <div className="card-details-mask">
                    {boardLabel.name}
                </div>
            </div>
        )
        if (props.isFull) return (
            <div className="card-preview-full-label" style={{ backgroundColor: boardLabel.color }}>
                <div className="card-preview-label-mask">
                    {boardLabel.name}
                </div>
            </div>
        )
        return (
            <div className="card-preview-collapsed-label" style={{ backgroundColor: boardLabel.color }}>
                <div className="card-preview-label-mask" />
            </div>
        )
    }

    return (
        <div className="card-preview-labels">
            {props.cardLabels.map((label, idx) => {
                return <div onClick={props.onClickLabel}  key={idx} > {displayLabel(label)} </div>
            })
            }
        </div>
    )
}

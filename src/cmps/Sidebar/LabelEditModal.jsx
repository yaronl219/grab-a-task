import React from 'react';
import { IconButton } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

export function LabelEditModal({ label, action, setLabelEditId, onRemoveLabel, card }) {
    const colors = ['green', 'yellow', 'orange', 'red', 'purple', 'blue', 'grey', 'black'];
    return (
        <div className="label-edit-modal">
            <IconButton className="close-modal" size="small"
                onClick={() => setLabelEditId()}>
                <CloseOutlinedIcon />
            </IconButton>
            <form onSubmit={(ev) => action(ev, label)}>
                <input type="text" name="labelName"
                    defaultValue={label ? label.name : ''}
                    placeholder="Enter label's name..." />
                <div className="color-pallete">
                    {colors.map(color => <React.Fragment key={color}>
                        <input required hidden type="radio" id={color} name="newColor"
                            value={color}
                            defaultChecked={label ? color === label.color : 'grey'} />
                        <label htmlFor={color}>
                            <div className={`color-picker ${color}`}></div>
                        </label>
                    </React.Fragment>)}
                </div>
                <div className="save-cancel-btns">
                    <button className="save-btn">Save</button>
                    {label && <button className="cancel-btn" onClick={() => onRemoveLabel(label.id)}>Delete</button>}
                </div>
            </form>
        </div >
    )
}

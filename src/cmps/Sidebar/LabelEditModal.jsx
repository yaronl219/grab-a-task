import React from 'react'
import { Label } from '../BoardHeader/Label';

export function LabelEditModal({ label, action, setLabelEditId, card }) {
    const colors = ['green', 'yellow', 'orange', 'red', 'purple', 'blue', 'grey'];
    return (
        <div className="label-edit-modal">
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
                    <div className="save-cancel-btns">
                        <button className="save-btn">Save</button>
                        <button className="cancel-btn"
                            onClick={(ev) => {
                                ev.preventDefault();
                                setLabelEditId();
                            }}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

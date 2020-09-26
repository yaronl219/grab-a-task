
import { Button, Checkbox, Dialog, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, TextField } from '@material-ui/core'
import { CloseOutlined } from '@material-ui/icons'
import React, { Component } from 'react'
import { templateService } from '../../services/templateService'
import ArtTrackIcon from '@material-ui/icons/ArtTrack';

export class CreateTemplate extends Component {

    state = {
        isOpen: false,
        includeAttachments: true,
        includeChecklists: true,
        includeLabels: true,
        templateName: ''

    }


    onOpen = () => {
        this.setState({ isOpen: true })
    }

    onClose = () => {
        this.setState({ isOpen: false })
    }

    onChange = (ev) => {
        this.setState({ templateName: ev.target.value })
    }

    createTemplateFromBoard = async () => {
        await templateService.createTemplateFromBoard(this.props.board, this.state.templateName, this.state.includeAttachments, this.state.includeChecklists, this.state.includeLabels)
        this.props.history.push('/templates')
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.checked });
    };

    render() {

        return (
            <div>
                <div className="open-template-button" onClick={this.onOpen}><ArtTrackIcon /><span>Create template</span></div>
                <Dialog open={this.state.isOpen} onClose={this.onClose} onBackdropClick={this.onClose}>
                    <div className="create-template">
                        <div className="create-template-header">
                            <div></div>
                            <div><h6>Create Template</h6></div>
                            <IconButton onClick={this.onClose}>
                                <CloseOutlined />
                            </IconButton>
                        </div>
                        <div className="create-template-form">
                            <div className="name">
                                <span>Give your template a name</span>
                                <TextField value={this.state.templateName} onChange={this.onChange} label="Template name" variant="outlined" />
                            </div>

                            <div className="checkboxes">
                                <FormControl>
                                    <FormLabel component="legend">Which items would you like to export to the template?</FormLabel>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox checked={this.state.includeAttachments} onChange={this.handleChange} name="includeAttachments" />}
                                            label="Attachments"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={this.state.includeChecklists} onChange={this.handleChange} name="includeChecklists" />}
                                            label="Checklists"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={this.state.includeLabels} onChange={this.handleChange} name="includeLabels" />}
                                            label="Labels"
                                        />
                                    </FormGroup>
                                </FormControl>
                            </div>
                            <div className="confirm">
                                <Button onClick={this.createTemplateFromBoard}>Create Template</Button>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}

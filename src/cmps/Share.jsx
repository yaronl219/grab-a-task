import { Button, IconButton, Popover, Tooltip } from '@material-ui/core'
import React, { Component } from 'react'
import ShareIcon from '@material-ui/icons/Share';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { CloseOutlined } from '@material-ui/icons';

export class Share extends Component {

    ref = React.createRef()
    copyRef = React.createRef()
    state = {
        isOpen: false
    }

    onOpen = () => {
        this.setState({ isOpen: true })
    }

    onClose = () => {
        this.setState({ isOpen: false })
    }

    copyToClipboard = () => {
        this.copyRef.current.select()
        document.execCommand('copy');
    };

    render() {
        const item = this.props.item
        const path = this.props.path

        return (
            <div ref={this.ref}>
                <Button onClick={this.onOpen}><ShareIcon /><span>Share</span></Button>
                <Popover
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={this.state.isOpen}
                    anchorEl={this.ref.current}
                    onClose={this.onClose}
                    onBackdropClick={this.onClose}
                >
                    <div className="share-container">
                        <div className="header">
                            <div />
                            <h4>Share this {item}</h4>
                            <IconButton onClick={this.onClose}>
                                <CloseOutlined />
                            </IconButton>
                        </div>
                        <div className="link">
                            <input ref={this.copyRef} type="text" readOnly value={path} />
                        </div>
                        <div className="share-btns-container">
                            <Tooltip title="Whatsapp">
                                <IconButton className="whatsapp" onClick={() => { window.open(`whatsapp://send?text=${path}`) }} >
                                    <WhatsAppIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Mail">
                                <IconButton className="mail" onClick={() => { window.open(`mailto:?subject=Check out this ${item}&amp;body=${path}`) }}>
                                    <MailOutlineOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Copy to clipboard">
                                <IconButton className="copy" onClick={this.copyToClipboard}>
                                    <FileCopyOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </Popover>
            </div>
        )
    }
}

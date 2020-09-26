import React, { Component } from 'react'
import { cloudService } from '../../services/cloudService'
import {DropzoneDialog} from 'material-ui-dropzone'

export class CardImgUpload extends Component {

    state = {
        item: null
    }

    uploadImg = async (file) => {
        
        await this.props.setUploading()
        const imgUrl = await cloudService.uploadImg(file)
        this.setState({item:imgUrl},this.submitImage)

    }


    submitImage = async() => {
        // if no item - do nothing
        if (!this.state.item) return
        // else - wait for the image to be added to the array
        await this.props.onAddImage(this.state.item)
        // set the state back to null
        this.setState({item:null})
    }
    handleChange(files){
        this.uploadImg(files[0])
      }
    render(){
        return (
            <DropzoneDialog
            acceptedFiles={['image/*']}
            cancelButtonText={"cancel"}
            submitButtonText={"submit"}
            maxFileSize={500000}
            open={this.props.isOpen}
            onClose={() => this.props.toggleOpen()}
            onSave={(files) => {
              this.handleChange(files)
              this.props.toggleOpen();
            }}
            showPreviews={true}
            showFileNamesInPreview={false}
          />
        )
      }

    // render() {
    //     if (!this.state.item) return (
            
    //             <div className="file-upload-form">
    //                 <form>
    //                     <input type="file" id="myFile" name="filename" placeholder="Upload Image" onChange={this.uploadImg} />
                        
    //                 </form>
    //             </div>
            
    //     )
    //     return (<div className="file-upload-form "><button disabled>Upload Image</button></div>)
    // }
}

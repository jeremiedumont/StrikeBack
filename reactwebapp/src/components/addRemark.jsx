import React, { useState } from 'react';

import {
    Grid,
    Card,
    Button,
    TextField,
    Typography,

} from '@material-ui/core';
import '../styles/addremark.css'

import { connect } from 'react-redux'

import history from '../history'

import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';

import { uploadImageToFireBase, addRemark } from '../DAOs/remarksDAO'

const AddRemark = (props) => {

    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const [isPublishable, setIsPublishable] = useState(true)

    const _handleImageChange = (file) => {
        setImage(file)
    }

    const handleChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleChangeText = (e) => {
        setText(e.target.value)
    }

    const _uploadFile = async (imageToUpload) => {
        const url = await uploadImageToFireBase(imageToUpload)
        setIsPublishable(true)
        return url
    }

    const _handlePublish = async () => {
        if (props.isLogged) {
            setIsPublishable(false)
            const url = await _uploadFile(image)
            const idRemark = await addRemark(props.token,title, text, url)
            history.push('/fullRemark' + idRemark)
        } else {
            alert("You must be logged in to submit a remark on Strike Back.")
        }
    }

    var fileInput //ref to hide the input element and use it in an other button

    return (
        <Card style={{ margin: 20, padding: 20 }}>
            <Typography variant="h4" gutterBottom>
                Add a remark to Strike Back
            </Typography>

            <Grid
                container
                spacing={3}
            >
                <Grid item xs={12}>
                    <TextField
                        required id="title"
                        label="Title of the new remark"
                        fullWidth
                        value={title}
                        onChange={handleChangeTitle}
                        helperText="The shorter the better :)"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        multiline
                        id="text"
                        label="TEXT"
                        fullWidth
                        value={text}
                        onChange={handleChangeText}
                    />
                </Grid>

                <Grid item xs={6}>
                    <input
                        accept="image/*"
                        className='ImagePicker'
                        multiple
                        type="file"
                        onChange={(event) => _handleImageChange(event.target.files[0])}
                        ref={file => fileInput = file}

                    />
                    <Button
                        onClick={() => fileInput.click()}
                        variant="contained"
                        color="primary"
                        component="span"
                        startIcon={<PhotoCameraOutlinedIcon />}
                    >
                        Upload
                        </Button>
                    {image && <h5>{image.name}</h5>}

                </Grid>
                <Grid item xs={6}>

                    <Button
                        onClick={() => _handlePublish()}
                        variant="contained"
                        color="secondary"
                        component="span"
                        disabled={!isPublishable}
                    >
                        Publish
                        </Button>

                </Grid>

            </Grid>
        </Card>
    )
}

const mapStateToProps = (state) => ({
    isLogged: state.authenticationReducer.isLoggedIn,
    token: state.authenticationReducer.token
})

export default connect(mapStateToProps)(AddRemark)
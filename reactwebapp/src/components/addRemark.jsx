import React from 'react';

import {
    Grid,
    Paper,
    Card,
    Button,
    IconButton,
    TextField,
    Typography,
    
} from '@material-ui/core';
import '../styles/addremark.css'
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';

//import {uploadImageToFireBase} from '../DAOs/remarksDAO'

export default class AddRemark extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: false,
            selectedFile: null
        }
    }

    _handleImageChange = (file) => {
        console.log(file)
        this.setState({
            selectedFile: file
        })
        this._uploadFile(file)
    }

    _handleSubmit() {
        if (this.state.isLoggedIn) {
            console.log('You will submit')
        } else {
            alert("You must be logged in to submit a remark on Strike Back.")
        }
    }

    _uploadFile = (image) => {
        //uploadImageToFireBase(image)
    }
    
    render() {
        return(
            <Card style={{margin:20, padding:20}}>
                <Typography variant="h4" gutterBottom>
                    Add a remark to Strike Back
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField 
                            required id="title"    
                            label="Title of the new remark" 
                            fullWidth 
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
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <input
                            accept="image/*"
                            className='ImagePicker'
                            multiple
                            type="file"
                            onChange={(event) => this._handleImageChange(event.target.files[0])}
                            ref={fileInput => this.fileInput = fileInput}
                            
                        />
                            <Button 
                                onClick= {() => this.fileInput.click()}
                                variant="contained" 
                                color="primary" 
                                component="span" 
                                startIcon={<PhotoCameraOutlinedIcon/>}
                            >
                                Upload
                            </Button>
                        
                    </Grid>
                    <Grid item xs={6}>
                        
                            <Button 
                                onClick= {() => this._handleSubmit()}
                                variant="contained" 
                                color="secondary" 
                                component="span" 
                            >
                                Submit
                            </Button>
                        
                    </Grid>
                    
                </Grid>
            </Card>            
        )
    }
}
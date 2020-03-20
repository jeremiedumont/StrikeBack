import React, { useState, useEffect } from 'react';

import {
    Grid,
    Card,
    Button,
    TextField,
    Typography,

} from '@material-ui/core';

import { connect } from 'react-redux'

import history from '../history'
import { addAnswer } from '../DAOs/answersDAO'

const AddAnswer = (props) => {

    const [content, setContent] = useState('')

    const handleChangeText = (e) => {
        setContent(e.target.value)
    }

    const _handlePublish = async () => {
        if (props.isLoggedIn) {
            console.log('You will submit')
            addAnswer(props.token,props.remarkId,content)
        } else {
            alert("You must be logged in to submit a answer on Strike Back.")
        }
    }

    return (
        <Card style={{ margin: 20, padding: 20 }}>
            <Typography variant="h4" gutterBottom>
                Add an answer to this remark:
            </Typography>

            <Grid
                container
                spacing={3}
            >

                <Grid item xs={12}>
                    <TextField
                        required
                        multiline
                        id="text"
                        label="Enter your answer here..."
                        fullWidth
                        value={content}
                        onChange={handleChangeText}
                    />
                </Grid>

                <Grid item xs={12}>

                    <Button
                        onClick={() => _handlePublish()}
                        variant="contained"
                        color="secondary"
                        component="span"
                    >
                        Publish
                        </Button>

                </Grid>

            </Grid>
        </Card>
    )
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.authenticationReducer.isLoggedIn,
    token: state.authenticationReducer.token
})

export default connect(mapStateToProps)(AddAnswer)
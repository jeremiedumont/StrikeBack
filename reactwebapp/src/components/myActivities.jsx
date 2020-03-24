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

const MyActivities = (props) => {

    const [content, setContent] = useState('')

    const handleChangeText = (e) => {
        setContent(e.target.value)
    }

    const _handlePublish = async () => {
        if (props.isLoggedIn) {
            console.log('You will submit')
            addAnswer(props.token,props.remarkId,content)
            .then(history.push('/')) //ajouter l'answer dans la vue, on peut faire des answers globales avec redux mais c'est pas fou
            .catch(err => console.error(err))
        } else {
            alert("You must be logged in to submit an answer on Strike Back.")
        }
    }

    return (
        <Card style={{ margin: 20, padding: 20 }}>
            <Typography variant="h4" gutterBottom>
                {props.token}
            </Typography>
        </Card>
    )
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.authenticationReducer.isLoggedIn,
    token: state.authenticationReducer.token
})

export default connect(mapStateToProps)(MyActivities)
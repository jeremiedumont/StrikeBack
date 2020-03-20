import React, { useState, bindActionCreators } from 'react';

import history from '../history'

import {
    Grid,
    Paper,
    Card,
    Button,
    IconButton,
    TextField,
    Typography,

} from '@material-ui/core';

import { signUp as signUpDAO } from '../DAOs/usersDAO';

import { connect, useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../actions'

const SignUp = () => {
    const [pseudo, setPseudo] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [token, setToken] = useState('')
    //const [color, setColor] = useState('')
    const [email, setEmail] = useState('')

    const _handleSubmit = () => {
        if(password == confirmPassword){
            signUpDAO(pseudo, password, "PinkColor", email)
            .then((res) => {
                    alert("User added")
                        //dispatch(login(resJson.authToken))
                        //localStorage.setItem('token',resJson.authToken);
                        //window.location.
                        history.push('/')
            }
            ).catch(err => console.log(err))
        }else{
            alert("Passwords do not match. Please try again !")
        }
    }

    const dispatch = useDispatch()

    return (
        <Card style={{ margin: 20, padding: 20 }}>
            <Typography variant="h4" gutterBottom>
                Sign Up
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required id="pseudo"
                        label="Pseudo"
                        onChange={(e) => {
                            setPseudo(e.target.value)
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        id="password"
                        type="password"
                        label="Password"
                        helperText="6 characters minimum"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        onChange={(e) => {
                            setConfirmPassword(e.target.value)
                        }}
                        id="confirmpassword"
                        type="password"
                        label="Confirm Password"
                        helperText="6 characters minimum"
                    />
                </Grid>


                <Grid item xs={12}>
                    <TextField
                        required id="email"
                        label="Email"
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                </Grid>

                <Grid item xs={12}>

                    <Button
                        onClick={(event) => _handleSubmit(event)}
                        variant="contained"
                        color="secondary"
                        component="span"
                    >
                        Sign Up
                        </Button>

                </Grid>

            </Grid>
        </Card>
    )
}

/*const mapStateToProps = (state) => ({
	isLogged: state.authenticationReducer.token
})

export default connect(mapStateToProps)(Login)*/
export default SignUp
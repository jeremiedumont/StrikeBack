import React, { useState } from 'react';

import {
    Grid,
    Paper,
    Card,
    Button,
    IconButton,
    TextField,
    Typography,

} from '@material-ui/core';

import { login as loginDAO } from '../DAOs/usersDAO';

import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../actions'

const Login = () => {
    const [pseudo, setPseudo] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')

    const _handleSubmit = () => {
        loginDAO(pseudo, password)
            .then((res) => {
                if (res.status == 200) {
                    res.json().then(resJson => {
                        console.log("_handleSubmit -> resJson.authToken", resJson.authToken)
                        dispatch(login(resJson.authToken))
                        localStorage.setItem('token',resJson.authToken);
                        //window.location.
                    })

                } else {
                    res.json().then(resJson => {
                        alert(resJson)
                    })
                }
            }
            )
    }

    const dispatch = useDispatch()

    return (
        <Card style={{ margin: 20, padding: 20 }}>
            <Typography variant="h4" gutterBottom>
                Login
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

                    <Button
                        onClick={(event) => _handleSubmit(event)}
                        variant="contained"
                        color="secondary"
                        component="span"
                    >
                        Login
                        </Button>

                </Grid>

            </Grid>
        </Card>
    )
}

/*export  class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            pseudo: '',
            password: '',
            token: ''
        }
    }

    _handleSubmit() {
        if (this.state.isLoggedIn) {
            alert("You are already logged in.")
        } else {
            loginDAO(this.state.pseudo, this.state.password)
                .then((res) => {
                    if (res.status == 200) {
                        res.json().then(resJson => {
                            this.setState({
                                token: resJson.authToken,
                                isLoggedIn: true
                            })
                            console.log(this.state.token)
                            //this.dispatch(login(this.state.token))
                            //window.location.href = "/"
                        })

                    } else {
                        res.json().then(resJson => {
                            alert(resJson)
                        })
                    }
                }
                )

        }
    }

    render() {
        return (
            <Card style={{ margin: 20, padding: 20 }}>
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required id="pseudo"
                            label="Pseudo"
                            onChange={(e) => {
                                this.setState({
                                    pseudo: e.target.value
                                })
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            required
                            onChange={(e) => {
                                this.setState({
                                    password: e.target.value
                                })
                            }}
                            id="password"
                            type="password"
                            label="Password"
                            helperText="6 characters minimum"
                        />
                    </Grid>
                    <Grid item xs={12}>

                        <Button
                            onClick={(event) => this._handleSubmit(event)}
                            variant="contained"
                            color="secondary"
                            component="span"
                        >
                            Login
                            </Button>

                    </Grid>

                </Grid>
            </Card>
        )
    }
}*/

export default Login
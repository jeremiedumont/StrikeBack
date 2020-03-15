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

import {login} from '../DAOs/usersDAO';

export default class Login extends React.Component {

    constructor(props){
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
            alert("You are already logged in")
        } else {
            login(this.state.pseudo, this.state.password).then(
                (res) => {
                    if (res.status == 200) {
                        res.json().then((resJson => {
                            this.setState({
                                token: resJson.authToken
                            })
                            console.log(this.state.token)
                        }))

                    } else {
                        console.log("Login -> _handleSubmit -> res", res)   
                    }
                }
            )
          
        }
    }

    render() {
        return(
            <Card style={{margin:20, padding:20}}>
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField 
                            required id="pseudo"    
                            label="Pseudo" 
                            onChange={(e) => {this.setState({
                                pseudo: e.target.value
                            })}}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            required
                            onChange={(e) => {this.setState({
                                password: e.target.value
                            })}}
                            id="password"
                            type="password"
                            label="Password"
                            helperText="6 characters minimum"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        
                            <Button 
                                onClick= {(event) => this._handleSubmit(event)}
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
}
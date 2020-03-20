import React from 'react'
import moment from 'moment'

import {
    Grid,
    Paper,
    Card,
    CardContent,
    IconButton,
    Avatar 
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import '../styles/answer.css'

import {getUserById} from '../DAOs/usersDAO'
import {incrementUp, incrementDown} from '../DAOs/answersDAO'

import history from '../history'
import { connect, useSelector, useDispatch } from 'react-redux'

class Answer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: this.props.isLoggedIn,
            user: {
                _id: this.props.answer.userId,
                pseudo: "",
                color: ""
            },
            pertinency: this.props.answer.pertinency
        }
    }

    componentDidMount(){
        getUserById(this.state.user._id)
        .then(user => {
            this.setState({
                user: {
                    pseudo: user.pseudo,
                    color: user.color
                }
            })
        })
    }

    _handleUp(){
        console.log('Click UP')
        incrementUp(this.props.answer._id)
        this.setState({
            pertinency: this.state.pertinency + 1
        })
    }

    _handleDown() {
        console.log('Click DOWN')
        incrementDown(this.props.answer._id)
        this.setState({
            pertinency: this.state.pertinency - 1
        })
    }

    render() {

        const date = moment(this.props.answer.date).format('DD/MM/YYYY')
        return(
            <Paper elevation={5} >
                <Card variant="outlined">
                    <Grid container spacing={2} className="Answer-content">
                        <Grid item xs={10}>
                            <CardContent>
                                <div>
                                    <h1>{this.props.answer.content}</h1>
                                    <div>
                                        <span>Written by {this.state.user.pseudo} on {date}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Grid>
                        {this.state.isLoggedIn && (
                            <Grid
                                item xs={1} 
                                container spacing={5}
                                direction="column"
                                justify="center"
                                alignItems="center"
                            >
                                    <IconButton
                                        color='primary'
                                        onClick={()=>{this._handleUp()}}
                                        variant="contained"
                                    >
                                        <ArrowUpwardIcon />
                                    </IconButton>
                                    <IconButton
                                        color='primary'
                                        onClick={()=>{this._handleDown()}}
                                        variant="contained"
                                    >
                                        <ArrowDownwardIcon />
                                    </IconButton>
                            </Grid>
                        )}
                        <Grid item xs={1} 
                            container spacing={5}
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >
                            <Avatar>
                                {this.state.pertinency} 
                            </Avatar>
                        </Grid>
                    </Grid>
                </Card>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.authenticationReducer.isLoggedIn,
    token: state.authenticationReducer.token
})

export default connect(mapStateToProps)(Answer)
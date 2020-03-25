import React from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
//import { addUp, addDown, addReport as addStateReport } from '../actions'

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
import ReportRoundedIcon from '@material-ui/icons/ReportRounded';
import '../styles/answer.css'

import { getUserById } from '../DAOs/usersDAO'
import { addReport } from '../DAOs/reportsDAO'
import { incrementUp, incrementDown } from '../DAOs/answersDAO'


class Answer extends React.Component {
    constructor(props) {
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

    componentDidMount() {
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

    _reportAnswer() {
        console.log("we should report this answer")
        console.log(this.props.answer._id)
        var action = { type: 'ADD_REPORT', postId: this.props.answer._id }
        this.props.dispatch(action)
        addReport(this.props.answer._id, "Answer", this.props.token)
    }

    _handleUp() {
        console.log('Click UP')
        //this.props.addUp(this.props.answer._id)
        var action = { type: 'ADD_UP', postId: this.props.answer._id }
        this.props.dispatch(action)
        incrementUp(this.props.answer._id, this.props.token)
        this.setState({
            pertinency: this.state.pertinency + 1
        })

        console.log(this.props.ups)
    }

    _handleDown() {
        console.log('Click DOWN')
        var action = { type: 'ADD_DOWN', postId: this.props.answer._id }
        this.props.dispatch(action)
        incrementDown(this.props.answer._id, this.props.token)
        this.setState({
            pertinency: this.state.pertinency - 1
        })
    }

    _alreadyChecked() {
        return this.props.ups.includes(this.props.answer._id)
    }

    render() {

        const date = moment(this.props.answer.date).format('DD/MM/YYYY')
        return (
            <Paper elevation={5} >
                <Card variant="outlined">
                    <Grid container className="Answer-content"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={this.state.isLoggedIn ? 8 : 9}>
                            <CardContent>
                                <div>
                                    <h1>{this.props.answer.content}</h1>
                                    <div>
                                        <span>Written by {this.state.user.pseudo} on {date}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Grid>

                        <Grid item xs={2} container 
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >
                            {this.state.isLoggedIn &&
                                <Grid item xs={4}>
                                    <IconButton
                                        style={{padding:'8px'}}
                                        disabled={this.props.ups.includes(this.props.answer._id)}
                                        color='primary'
                                        onClick={() => { this._handleUp() }}
                                        variant="contained"
                                    >
                                        <ArrowUpwardIcon />
                                    </IconButton>
                                </Grid>
                            }

                            <Grid item xs={4}>
                                <Avatar>
                                    {this.state.pertinency}
                                </Avatar>
                            </Grid>

                            {this.state.isLoggedIn &&
                                <Grid item xs={4}>
                                    <IconButton
                                        style={{padding:'8px'}}
                                        disabled={this.props.downs.includes(this.props.answer._id)}
                                        color='primary'
                                        onClick={() => { this._handleDown() }}
                                        variant="contained"
                                    >
                                        <ArrowDownwardIcon />
                                    </IconButton>
                                </Grid>
                            }
                        </Grid>

                        {this.state.isLoggedIn && (
                            <Grid item xs={1}>
                                <IconButton
                                    disabled={this.props.reports.includes(this.props.answer._id)}
                                    onClick={() => {
                                        this._reportAnswer()
                                    }}
                                >
                                    <ReportRoundedIcon fontSize='large'></ReportRoundedIcon>
                                </IconButton>
                            </Grid>
                        )}
                    </Grid>
                </Card>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.authenticationReducer.isLoggedIn,
    token: state.authenticationReducer.token,
    ups: state.postReducer.ups,
    downs: state.postReducer.downs,
    reports: state.postReducer.reports
})

// const mapDispatchToProps =  {
//     //return {
//       // implicitly forwarding arguments
//     //   addUp: (...postId) =>
//     //     dispatch(addUp(postId))
//     addUp
//     //}
//   }

export default connect(mapStateToProps)(Answer)
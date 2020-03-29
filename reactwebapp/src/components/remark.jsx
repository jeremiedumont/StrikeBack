import React from 'react';
import moment from 'moment';

//ICONS
import HearingIcon from '@material-ui/icons/Hearing';
import ReportRoundedIcon from '@material-ui/icons/ReportRounded';

import '../styles/remark.css'

import {
    Button,
    Grid,
    Paper,
    Card,
    CardContent,
    CardActionArea,
    IconButton
} from '@material-ui/core';

import { getUserById } from '../DAOs/usersDAO';
import { incrementHeard, decrementHeard } from '../DAOs/remarksDAO';
import { addReport } from '../DAOs/reportsDAO'
import history from '../history'
import { connect } from 'react-redux'


class Remark extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                _id: '',
                pseudo: "",
                admin: false,
                email: "",
                creationDate: Date.now(),
                color: ""
            },
            title: this.props.remark.title,
            text: this.props.remark.text,
            heard: this.props.remark.heard,
            image: this.props.remark.image,
            date: this.props.remark.date,
            answers: []
        }
    }

    componentDidMount() {
        this.setState({
            heard: this.props.remark.heard
        })
        getUserById(this.props.remark.userId)
            .then(res => {
                return res
            }).then(user => {
                this.setState({
                    user: user
                })
            })
    }

    // Nécessaire car dans le component parent l'adresse de la props ne change pas, donc les components sont identifiés comme étant les meme, à corriger dans une futur version.
    UNSAFE_componentWillReceiveProps(nextprops) { // Note: la gestion dynamique du heard a été gérée avant l'implémentation de redux, d'où le code compliqué pour éviter un bug d'affichage.
        if (this.state.heard !== nextprops.remark.heard) {
            this.setState({ heard: nextprops.remark.heard })

        } 
        this.setState({
            title: nextprops.remark.title,
            text: nextprops.remark.text,
            image: nextprops.remark.image,
            date: nextprops.remark.date
        })
    } //bug remarquable: appuyer sur heard puis sur report decrement la vue du heard   

    _handleClick() {
        if (this.props.isClickable) {
            history.push('/fullRemark' + this.props.remark._id)
        } else {
            console.log('You cannot go anywhere from here sorry.')
        }
    }

    _heardAction() {
        var action = {type: '', postId: ''}
        const oldHeard = this.state.heard
        if (this.props.heards.includes(this.props.remark._id)) {
            action = { type: 'DECREMENT_HEARD', postId: this.props.remark._id }
            decrementHeard(this.props.remark._id, this.props.token)
            this.setState({
                heard: oldHeard - 1
            })
        } else {
            action = { type: 'INCREMENT_HEARD', postId: this.props.remark._id }
            incrementHeard(this.props.remark._id, this.props.token)
            this.setState({
                heard: oldHeard + 1
            })
        }
        this.props.dispatch(action)
    }

    _reportRemark() {
        var action = { type: 'ADD_REPORT', postId: this.props.remark._id }
        this.props.dispatch(action)
        addReport(this.props.remark._id, "Remark", this.props.token)
    }

    _colorPicker() {
        if (this.props.heards.includes(this.props.remark._id)) {
            return 'primary'
        } else {
            return 'default'
        }
    }

    render() {
        var isFilledWithImage = false

        const image = this.state.image
        if (image !== 'none') {
            isFilledWithImage = true
        }

        const date = moment(this.state.date).format('DD/MM/YYYY, hh:mm a')
        return (
            <Paper elevation={10}>
                <Card>
                    <Grid className="Remark-content"
                        container
                        spacing={5}
                        direction="row"
                        alignItems='center'
                    >
                        <Grid item xs={9} md={10}>
                            <CardActionArea onClick={() => this._handleClick()}>
                                <CardContent>
                                    <Grid container spacing={2}
                                        direction="row"
                                        justify="flex-start"
                                        alignItems="flex-start"
                                    >
                                        <Grid item xs={6}>
                                            <div align="left">
                                                <span >Written by </span>
                                                <span>{this.state.user.pseudo} </span>
                                            </div>
                                        </Grid>
                                        <Grid item xs={6} >
                                            <div align="right">
                                                <span>{date}</span>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}
                                        direction="row"
                                        justify="flex-start"
                                        alignItems="flex-start"
                                    >
                                        <Grid item xs={12}>
                                            <h1 className='title'>
                                                {this.state.title}
                                            </h1>
                                        </Grid>

                                        {isFilledWithImage && (
                                            <Grid item xs={12} >
                                                <img className='image' src={image} alt='Remark' style={{
                                                    width: '40%',
                                                    height: 'auto'
                                                }} />

                                            </Grid>
                                        )}

                                        <Grid item xs={12} >
                                            <h3 className='remark'>{this.state.text}</h3>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </CardActionArea>

                        </Grid>
                        {this.props.isLoggedIn && (
                            <Grid item xs={3} md={2}
                                container
                                spacing={5}
                                direction="column"
                                alignItems='center'
                                justify='center'
                            >
                                <Grid>
                                    <Button
                                        variant="contained"
                                        color={this._colorPicker()}
                                        onClick={() => {
                                            this._heardAction()
                                        }}
                                        endIcon={<HearingIcon />}
                                    >
                                        <p>{this.state.heard}</p>
                                    </Button>
                                </Grid>

                                <Grid>
                                    <IconButton
                                        onClick={() => {
                                            this._reportRemark()
                                        }}
                                        disabled={this.props.reports.includes(this.props.remark._id)}
                                    >
                                        <ReportRoundedIcon fontSize='large'></ReportRoundedIcon>
                                    </IconButton>
                                </Grid>

                            </Grid>
                        )}
                        {!this.props.isLoggedIn && (
                            <Grid item xs={3} md={2}
                                container
                                spacing={5}
                                direction="column"
                                alignItems='center'
                                justify='center'
                            >
                                <Grid>
                                    <HearingIcon />
                                    <span>{this.state.heard}</span>
                                </Grid>
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
    heards: state.postReducer.heards,
    reports: state.postReducer.reports
})

export default connect(mapStateToProps)(Remark)
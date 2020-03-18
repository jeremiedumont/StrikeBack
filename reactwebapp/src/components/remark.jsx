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
    IconButton,
} from '@material-ui/core';

import {getUserById} from '../DAOs/usersDAO';
import {incrementHeard, decrementHeard} from '../DAOs/remarksDAO';


export default class Remark extends React.Component {
    constructor(props){ //remarkId
        super(props);        
        this.state = {
            isLoggedIn: false,
            url : '/fullRemark' + this.props.remark._id,
            user: {
                _id: this.props.remark.userId,
                pseudo: "",
                admin: false,
                email: "",
                creationDate: Date.now(),
                color: ""
            },
            heard:this.props.remark.heard,
            isHeard: false, //attention on peut arnaquer
            answers: [],
            isClicked: false
        }

        getUserById(this.state.user._id)
        .then( res => {
            //console.log("Remark -> constructor -> this.state.user._id", this.state.user._id,this.props.remark)
            return res
        }).then(user => {
            this.setState({
                user: user
            })
        })
    }    

    _handleClick() {
        console.log('Click')
        this.setState({
            isClicked: !this.state.isClicked
        })
    }

    _heardAction() {
        if (this.state.isHeard) {
            decrementHeard(this.props.remark._id)
            this.setState({
                heard: this.state.heard - 1,
                isHeard: false
            })
        } else {
            incrementHeard(this.props.remark._id)
            this.setState({
                heard: this.state.heard + 1,
                isHeard: true
            })
        }
    }

    _reportRemark() {
        console.log('We should report the remark.')
    }

    _colorPicker() {
        if (this.state.isHeard) {
            return 'primary'
        } else {
            return 'default'
        }
    }

    render() {
        console.log('Render of a Remark.')
        var isFilledWithImage = false
        
        const image = this.props.remark.image
        if (image !== 'none') {
            isFilledWithImage = true
        }

        const date = moment(this.props.remark.date).format('DD/MM/YYYY, hh:mm a')
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
                                <CardActionArea href={this.state.url}>
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
                                                <h1 className='title' 
                                                    onClick={() => {this._handleClick()}}
                                                >
                                                    {this.props.remark.title}
                                                </h1>
                                            </Grid>
                                            
                                            {isFilledWithImage && (
                                                <Grid item xs={12} >
                                                    <img className='image' src={image} alt='Remark' style={{
                                                        height: 300,
                                                        width: 300
                                                    }}/>
                                                </Grid>
                                            )}

                                            <Grid item xs={12} >
                                                <h3 className='remark'>{this.props.remark.text}</h3>
                                            </Grid>
                                        </Grid>    
                                    </CardContent>
                                </CardActionArea>
                            
                            </Grid>
                            {this.state.isLoggedIn && (
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
                                            onClick={()=>{
                                                this._heardAction()
                                            }}
                                            endIcon={<HearingIcon />}
                                        >
                                            <p>{this.state.heard}</p>                                    
                                        </Button>
                                    </Grid>

                                    <Grid>
                                        <IconButton
                                            onClick={()=>{
                                                this._reportRemark()
                                            }}
                                        >
                                            <ReportRoundedIcon fontSize='large'></ReportRoundedIcon>
                                        </IconButton>
                                    </Grid>

                                </Grid>                        
                            )}
                        </Grid>
                    </Card>
                </Paper>              
                                    
        )
    }
}
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
import {addReport} from '../DAOs/reportsDAO'
import history from '../history'
import { connect, useSelector, useDispatch } from 'react-redux'


class Remark extends React.Component {
    constructor(props){  
        super(props);        
        this.state = {
            user: {
                _id: '', //this.props.remark.userId
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
            isHeard: false, //attention on peut arnaquer
            answers: []
        }
    }
    
    componentDidMount() {
        this.setState({
            heard: this.props.remark.heard
        })
        getUserById(this.props.remark.userId)
        .then( res => {
            //console.log("Remark -> constructor -> this.state.user._id", this.state.user._id,this.props.remark)
            return res
        }).then(user => {
            this.setState({
                user: user
            })
        })
    } 

   componentWillReceiveProps(nextprops){
       this.setState({
        heard: nextprops.remark.heard,
        title: nextprops.remark.title,
        text: nextprops.remark.text,
        image: nextprops.remark.image,
        date: nextprops.remark.date
    })
   }

    _handleClick() {
        console.log('Click')
        if (this.props.isClickable) {
            history.push('/fullRemark' + this.props.remark._id)
        } else {
            console.log('You cannot go anywhere from here sorry.')
        }
    }

    _heardAction() {
        if (this.state.isHeard) {
            decrementHeard(this.props.remark._id, this.props.token)
            this.setState({
                heard: this.state.heard - 1,
                isHeard: false
            })
        } else {
            incrementHeard(this.props.remark._id, this.props.token)
            this.setState({
                heard: this.state.heard + 1,
                isHeard: true
            })
        }
    }

    _reportRemark() {
        console.log('We should report the remark.')
        addReport(this.props.remark._id, "Remark", this.props.token)
    }

    _colorPicker() {
        if (this.state.isHeard) {
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
                                                        height: 300,
                                                        width: 300
                                                    }}/>
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
                                            }}>
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
                                    <p>{this.state.heard}</p> 
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
    token: state.authenticationReducer.token
})

export default connect(mapStateToProps)(Remark)
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import moment from 'moment'

import {
    Grid,
    Card,
    Button,
    Paper,
    Typography,
    ButtonGroup

} from '@material-ui/core';

import history from '../history'

import Remark from './remark'
import Answer from './answer'

import { getAllAnswersOfOneUser } from '../DAOs/answersDAO'
import { getAllRemarksOfOneUser } from '../DAOs/remarksDAO'
import { getUserByToken } from '../DAOs/usersDAO'

const MyActivities = (props) => {

    const [user, setUser] = useState({})

    const [displayRemarks, setDisplayRemarks] = useState(false)
    const [remarks, setRemarks] = useState([])

    const [displayAnswers, setDisplayAnswers] = useState(false)
    const [answers, setAnswers] = useState([])

    useEffect(() => {
        async function fetchData(token) {
            const newUser = await getUserByToken(token)
            setUser(newUser)
            const newRemarks = await getAllRemarksOfOneUser(token)
            setRemarks(newRemarks)
            setDisplayRemarks(true)
            const newAnswers = await getAllAnswersOfOneUser(token)
            setAnswers(newAnswers)
        }
        fetchData(props.token)
    },[])

    const _handleMyRemarkClick = () => {
        console.log('_handleMyREMARKClick')
        setDisplayAnswers(false)
        setDisplayRemarks(true)
    }
    const _handleMyAnswerClick = () => {
        console.log('_handleMyANSWERClick')
        setDisplayRemarks(false)
        setDisplayAnswers(true)
    }

    const date = moment(user.creationDate).startOf('day').fromNow().split('ago')[0];
    return (
        <>
        {(displayAnswers || displayRemarks) &&
            
            <> 
                <Paper elevation={10} style={{ margin: 20, padding: 20 }}>
                    <Typography variant="h5" gutterBottom>
                        Welcome on the section 'My activities' {user.pseudo}. <br/>It's been {date} that you are a member of Strike-Back.
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        You posted {remarks.length} remarks and {answers.length} answers til now.
                    </Typography>
                    
                </Paper>
                <Card style={{ margin: 20, padding: 20 }}>
                <ButtonGroup color="secondary" aria-label="outlined primary button group">
                    <Button
                        onClick={() => _handleMyRemarkClick()}
                    >
                        My remarks
                    </Button>
                    <Button
                        onClick={() => _handleMyAnswerClick()}
                    >
                        My answers
                    </Button>
                </ButtonGroup>
                    {displayRemarks &&
                        remarks.map((remark, index) => (
                            <div key={index} style={styles.remark}>
                                <Remark remark={remark} isClickable={true}></Remark>
                            </div>
                        ))
                    }
                    {displayAnswers &&
                        answers.map((answer, index) => (
                            <div 
                                key={index} 
                                style={styles.answer} 
                                onClick={() => history.push('fullRemark' + answer.remarkId)}
                                className='NavBar-Title' //TODO: specfic css file
                                >
                                <Answer answer={answer}></Answer>
                            </div>
                        ))
                    }
                </Card>
            </>
        }
        </>
    )
}

let styles = {
    container: {
        margin: 20,
        marginTop: 40,
    },
    remark: {
        margin: 20,
    },
    answer: {
        margin: 20,
    },
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.authenticationReducer.isLoggedIn,
    token: state.authenticationReducer.token
})

export default connect(mapStateToProps)(MyActivities)
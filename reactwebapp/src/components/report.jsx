import React, { useState } from 'react'
import moment from 'moment'

import {
    Grid,
    Paper,
    Card,
    CardContent,
    Modal,
    Button,
    makeStyles
} from '@material-ui/core';

import '../styles/answer.css'
import '../styles/remark.css'

import { getUserById } from '../DAOs/usersDAO'
import { dismissReport, deleteReport } from '../DAOs/reportsDAO'
import { getRemarkById, deleteRemark } from '../DAOs/remarksDAO'
import { getAnswerById, deleteAnswer } from '../DAOs/answersDAO'

import history from '../history'
import { connect, useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';

const Report = (props) => {

    const [className, setclassName] = useState('Remark-content')
    const [title, setTitle] = useState() //doit init a vide pour les answers
    const [user, setUser] = useState('')
    const [content, setContent] = useState('')
    const [isModalopen, setIsModalOpen] = useState(false);
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    function getModalStyle() {
        const top = 50;
        const left = 50;
      
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
      }

    useEffect(() => {
        setTitle(null)
        async function fetchData(type) {
            if (type === 'Answer') {
                setclassName('Answer-content')
                const answer = await getAnswerById(props.report.postId)
                setContent(answer.content)
                const user = await getUserById(answer.userId)
                setUser(user)
            } else if (type === 'Remark') {
                setclassName('Remark-content')
                const remark = await getRemarkById(props.report.postId)
                setTitle(remark.title)
                setContent(remark.text)
                const user = await getUserById(remark.userId)
                setUser(user)
            }
        }

        fetchData(props.report.type)
    }, [props.report.postId])

    const _deletePost = () => {
        if (props.report.type === 'Answer') {
            deleteReport(props.token, props.report._id)
            deleteAnswer(props.token, props.report.postId)
        } else if (props.report.type === 'Remark') {
            deleteReport(props.token, props.report._id)
            deleteRemark(props.token, props.report.postId)
        }
        props.deleteReportFromState()
        setIsModalOpen(false)
        alert('Post deleted with success.')
    }

    const _dismissReport = () => {
        dismissReport(props.token, props.report.postId)
            .catch(err => console.error(err))
        props.deleteReportFromState()
    }

    const _handleDeleteClick = () => {
        handleOpenModal('delete')
    }

    const _handleDismissClick = () => {
        handleOpenModal('dismiss')
    }

    return (
        <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={isModalopen}
                onClose={handleCloseModal}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2 id="modal-title">Do you really want to delete this post ?</h2>
                    <p id="modal-description">
                        The action will be irreversible.
                    </p>
                    <Button
                        onClick={() => _deletePost()}
                        variant="outlined"
                        color="primary"
                    >
                        Delete post
                    </Button>
                </div>
            </Modal>
            <Paper elevation={5} >
                <Card variant="outlined" >
                    <CardContent className={className}>
                        <Grid
                            container
                            spacing={8}
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item xs={2}>
                                <h2>{props.report.numberReportings} Reports</h2>
                                <h5>{props.report.type} written by {user.pseudo}</h5>
                            </Grid>

                            <Grid item xs={7}>
                                {(title != null) && <h2>{title}</h2>}
                                <h3>{content}</h3>
                            </Grid>
                            <Grid
                                container
                                item xs={3}
                                spacing={5}
                                direction="column"
                            >
                                <Grid item xs={6}>
                                    <Button
                                        onClick={() => _handleDeleteClick()}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Delete post
                                    </Button>
                                </Grid>

                                <Grid item xs={6}>
                                    <Button
                                        onClick={() => _dismissReport()}
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Dismiss report
                                </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Paper>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const mapStateToProps = (state) => ({
    isAdmin: state.authenticationReducer.isAdmin,
    token: state.authenticationReducer.token,

})

export default connect(mapStateToProps)(Report)
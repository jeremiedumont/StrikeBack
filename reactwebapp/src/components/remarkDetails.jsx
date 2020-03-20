import React from 'react'

import {getAnswersByRemarkId, addAnswer} from '../DAOs/answersDAO'
import {getRemarkById} from '../DAOs/remarksDAO'
import Remark from './remark'
import Answer from './answer'
import AddAnswer from './addAnswer'

import { connect } from 'react-redux'

class RemarkDetails extends React.Component {
    constructor(props){ //remark
        super(props);
        this.state = {
            remark: {
                _id: this.props.match.params.id
            },
            answers: [],
            isLoading: true
        }

        getAnswersByRemarkId(this.state.remark._id)
        .then( res => {
            return res
        }).then(answers => {
            this.setState({
                answers: answers
            })
        })
    }

    componentDidMount() {
        getRemarkById(this.props.match.params.id)
        .then( res => {
            return res
        }).then(newremark => {
            //console.log("RemarkDetails -> componentDidMount -> remark", newremark)
            this.setState({
                remark: newremark,
                isLoading: false
            })
        })
    }

    render() {
        console.log('Render of a remarkDetails.')
        return (            
            <div style={styles.details}>
                { !this.state.isLoading && (
                    <Remark remark={this.state.remark} isClickable='false'></Remark>
                )}
                <div style={styles.answers}>
                    {this.state.answers.map((answer, index) => (
                        <div key={index} style={styles.answer}>
                            <Answer answer={answer}></Answer>
                        </div>
                        
                    ))
                    }
                </div>
                {this.props.isLoggedIn && <AddAnswer remarkId={this.state.remark._id}></AddAnswer>}
                
            </div>
        )
    }
}
const styles = {
    details: {
      margin: 50,
      padding: 1
    },
    answers: {
        marginTop: 50,
    },
    answer: {
        //backgroundColor: '#98ffff',
        margin: 20,
        padding: 1
      }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.authenticationReducer.isLoggedIn,
    token: state.authenticationReducer.token
})

export default connect(mapStateToProps)(RemarkDetails)
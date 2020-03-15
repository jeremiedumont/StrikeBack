import React from 'react'

import {getAnswersByRemarkId} from '../DAOs/answersDAO'
import {getRemarkById} from '../DAOs/remarksDAO'
import Remark from './remark'
import Answer from './answer'

export default class RemarkDetails extends React.Component {
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
                    <Remark remark={this.state.remark}></Remark>
                )}
                <div style={styles.answers}>
                    {this.state.answers.map((answer, index) => (
                        <div key={index} style={styles.answer}>
                            <Answer answer={answer}></Answer>
                        </div>
                        
                    ))
                    }
                </div>
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
import React from 'react'
import moment from 'moment'

import {getAnswersByRemarkId} from '../DAOs/answersDAO'

import Remark from './remark'
import Answer from './answer'

export default class RemarkDetails extends React.Component {
    constructor(props){ //remark
        super(props);
        this.state = {
            //remark: this.props.remark,
            answers: []
        }
    }

    componentDidMount(){
        getAnswersByRemarkId(this.props.remark._id)
        .then( res => {
            return res
        }).then(answers => {
            this.setState({
                answers: answers
            })
        })
    }

    render() {
        console.log('Render of a remarkDetails.')
        //<Remark remark={this.props.remark}></Remark>
        return (
            <div style={styles.answers}>
                {this.state.answers.map((answer, index) => (
                    <div key={index} style={styles.answer}>
                        <Answer answer={answer}></Answer>
                    </div>
                ))
                }
            </div>
        )
    }
}
let styles = {
    answers: {
      marginLeft: 50,
      marginRight: 50,
      marginBottom: 10,
      padding: 1
    },
    answer: {
        backgroundColor: '#98b7e3',
        margin: 10,
        padding: 1
      }
}
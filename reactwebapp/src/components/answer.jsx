import React from 'react'
import moment from 'moment'

import {getUserById} from '../DAOs/usersDAO'

export default class Answer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: {
                _id: this.props.answer.userId,
                pseudo: "",
                color: ""
            }
        }
    }

    componentDidMount(){
        getUserById(this.state.user._id)
        .then( res => {
            return res
        }).then(user => {
            this.setState({
                user: {
                    pseudo: user.pseudo,
                    color: user.color
                }
            })
        })
    }

    render() {

        const date = moment(this.props.answer.date).format('DD/MM/YYYY')
        return(
            <div>
                <h4 className='user'>Written by {this.state.user.pseudo} on {date}</h4>
                <h1 className='content'>{this.props.answer.content}</h1>
            </div>
        )
    }
}

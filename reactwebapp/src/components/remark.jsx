import React from 'react'
import moment from 'moment'

import {getUserById} from '../DAOs/usersDAO'
import RemarkDetails from './remarkDetails';
//import Answer from './answer'

export default class Remark extends React.Component {
    constructor(props){ //remark
        super(props);
        this.state = {
            user: {
                _id: this.props.remark.userId,
                pseudo: "",
                admin: false,
                email: "",
                creationDate: Date.now(),
                color: ""
            },
            answers: [],
            isClicked: false
        }
    }

    componentDidMount(){
        getUserById(this.state.user._id)
        .then( res => {
            return res
        }).then(user => {
            this.setState({
                user: user
            })
            //console.log("Remark -> componentDidMount -> user", this.state.user)
        })
    }

    _handleClick() {
        console.log('click')
        this.setState({
            isClicked: false
        })
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
            <div 
            style={styles.container}
            onClick={() => {
                console.log('click')
                this.setState({
                    isClicked: !this.state.isClicked
                })
            }}
            >
                <h4 className='user'>Written by {this.state.user.pseudo} on {date}</h4>
                <h1 className='title'>{this.props.remark.title}</h1>
                {isFilledWithImage && (
                    <img className='image' src={image} alt='Remark' style={{
                        height: 300,
                        width: 300
                      }}/>
                )}
                <h3 className='remark'>{this.props.remark.text}</h3>
                {this.state.isClicked && (
                    <div>
                        <RemarkDetails remark={this.props.remark}></RemarkDetails>
                    </div>
                )}
            </div>
        )
    }
}
let styles = {
    container: {
      backgroundColor: '#6186ba',
      margin: 10,
      padding: 2
    }
}

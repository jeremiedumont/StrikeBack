import React from 'react'
import Remark from './remark'
import {getRemarksSortedByDate,getRemarksSortedByHeard} from '../DAOs/remarksDAO'

export class Home extends React.Component {
    constructor(props){ //remark
        super(props);
        this.state = {
            isLoggedIn: false,
            remarks: []
        }

        this._getRemarks('heard',-1,0,10)
        .then( res => {
            return res
        }).then(remarks => {
            this.setState({
                remarks: remarks
            })
        })
    }

    _getRemarks(type,order,skip,number) {
        if (type === 'date') {
          return getRemarksSortedByDate(order,skip,number)
        } else if (type === 'heard') {
            return getRemarksSortedByHeard(order,skip,number)
        }
    }

    render() {
        console.log('Render of a the Home page.')
        return (
            <div style={styles.container}>
                
                {this.state.remarks.map((remark, index) => (
                    <div key={index} style={styles.remark}>
                        <Remark remark={remark}></Remark>
                    </div>
                ))
                }
            </div>
        )
    }
}

let styles = {
    container: {
      margin: 20,
      marginTop: 50
    },
    remark: {
        margin: 20,
    }
}
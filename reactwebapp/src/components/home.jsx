import React from 'react'
import Remark from './remark'
import {getRemarksSortedByDate,getRemarksSortedByHeard} from '../DAOs/remarksDAO'


export class Home extends React.Component {
    constructor(props){ //remark
        super(props);
        this.state = {
            remarks: [{
                'text': 'je suis une remark',
                'image': 'none'
              }]
        }
    }

    _getRemarks(type,order,skip,number) {
        if (type === 'date') {
          return getRemarksSortedByDate(order,skip,number)
        } else if (type === 'heard') {
            return getRemarksSortedByHeard(order,skip,number)
        }
    }

    componentDidMount(){
        this._getRemarks('date',1,0,10)
        .then( res => {
            return res
        }).then(remarks => {
            this.setState({
                remarks: remarks
            })
        })
    }

    render() {
        console.log('Render of a the Home page.')
        return (
            <div>
                {this.state.remarks.map((remark, index) => (
                    <div key={index}>
                        <Remark remark={remark}></Remark>
                    </div>
                ))
                }
            </div>
        )
    }
}
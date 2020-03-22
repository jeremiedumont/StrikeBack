import React, { useState, useEffect } from 'react'
import Remark from './remark'
import { getRemarksSortedByDate, getRemarksSortedByHeard } from '../DAOs/remarksDAO'

import {
    Button,
} from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

class HomeClass extends React.Component {
    constructor(props){      
        super(props);        
        this.state = {
            remarks: [],
            date: { color: 'primary', status: 'down' },
            heard: { color: 'default', status: '' },
            pageParameters: { type: 'date', order: 1, skip: 0, number: 10 }
        }
    }

    _getRemarks = async (type, order, skip, number) => {
        if (type === 'date') {
            return getRemarksSortedByDate(order, skip, number)
        } else if (type === 'heard') {
            return getRemarksSortedByHeard(order, skip, number)
        }
    }
}

const Home = () => {
    const [remarks, setRemarks] = useState([])
    const [date, setDate] = useState({ color: 'primary', status: 'down' })
    const [heard, setHeard] = useState({ color: 'default', status: null })
    const [pageParameters, setPageParameters] = useState({ type: 'date', order: -1, skip: 0, number: 10 })

    const _getRemarks = async (type, order, skip, number) => {
        if (type === 'date') {
            return getRemarksSortedByDate(order, skip, number)
        } else if (type === 'heard') {
            return getRemarksSortedByHeard(order, skip, number)
        }
    }

    useEffect(() => {
        console.log('useEffect')
        async function fetchData() {
            const response = await _getRemarks(pageParameters.type, pageParameters.order, pageParameters.skip, pageParameters.number)
            setRemarks(response)
        }
        fetchData()
        
        },
        [pageParameters]
    )

    const _filter = async  (type) => {
        const oldSkip = pageParameters.skip
        const oldNumber = pageParameters.number
        switch (type) {
            case 'date':
                if (date.status == 'up') {
                    setDate({ color: 'primary', status: 'down' })
                    console.log('Filtered by date - down')
                    setPageParameters({
                        type: 'date',
                        order: -1,
                        skip: oldSkip,
                        number: oldNumber
                    })
                } else {
                    setDate({ color: 'primary', status: 'up' })
                    console.log('Filtered by date - up')
                    setPageParameters({
                        type: 'date',
                        order: 1,
                        skip: oldSkip,
                        number: oldNumber
                    })
                }
                setHeard({ color: 'default', status: '' }) //no status --> no icon
                break;
            case 'heard':
                if (heard.status == 'up') {
                    setHeard({ color: 'primary', status: 'down' })
                    console.log('Filtered by heard - up to down')
                    setPageParameters({
                        type: 'heard',
                        order: 1,
                        skip: oldSkip,
                        number: oldNumber
                    })
                } else { //si c'est down ou non selectionné
                    setHeard({ color: 'primary', status: 'up' })
                    console.log('Filtered by heard - down to up')
                    setPageParameters({
                        type: 'heard',
                        order: -1,
                        skip: oldSkip,
                        number: oldNumber
                    })
                }
                setDate({ color: 'default', status: '' }) //no status --> no icon
                break;
            default:
                console.log('Choose an action type.')
        }
 
        // const res = await _getRemarks(pageParameters.type, pageParameters.order, pageParameters.skip, pageParameters.number)
        // setRemarks(res)
        // console.log(remarks)
    }
    const _chooseIcon = (filter) => {
        if (filter.status == 'up') {
            return <KeyboardArrowUpIcon />
        } else if (filter.status == 'down') {
            return <KeyboardArrowDownIcon />
        } else {
            return null
        }
    }

    const _chooseColor = (filter) => {
        if (filter.status == 'up' || filter.status == 'down') {
            return 'primary'
        } else {
            return 'default'
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.filters}>
                <span style={styles.button}>
                    <Button
                        variant="contained"
                        color={_chooseColor(date)}
                        onClick={() => {
                            _filter('date')
                        }}
                        startIcon={_chooseIcon(date)}
                    > Date
                    </Button>

                </span>
                <span style={styles.button}>
                    <Button
                        variant="contained"
                        color={_chooseColor(heard)}
                        onClick={() => {
                            _filter('heard')
                        }}
                        startIcon={_chooseIcon(heard)}
                    > Heard
                    </Button>

                </span>
            </div>
            {remarks.map((remark, index) => (
                <div key={index} style={styles.remark}>
                    <Remark remark={remark} isClickable={true}></Remark>
                </div>
            ))}
        </div>
    )
}

let styles = {
    container: {
        margin: 20,
        marginTop: 50,
    },
    remark: {
        margin: 20,
    },
    filters: {
        marginBottom: 50
    },
    button: {
        margin: 10
    }
}

export default Home
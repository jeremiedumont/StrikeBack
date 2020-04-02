import React, { useState, useEffect } from 'react';

import {
    Card,
    Paper
} from '@material-ui/core';

import {getRemarkById} from '../DAOs/remarksDAO'

const Notification = (props) => {

    const [remark, setRemark] = useState({title: ''})

    useEffect(()=>{
        async function fetchData(id) {
            if (id !== null) {
                const newRemark = await getRemarkById(id)
                setRemark(newRemark)
            }
        }
        fetchData(props.remarkId)
    },
    [props.remarkId]
    )
    

    return (
        <Paper elevation={20}>
            <Card>
                <h1>{(remark !== null) && remark.title}</h1>
                <h4>{props.numberNotifs} answer(s)</h4>            
            </Card>
        </Paper>
    )
}

export default Notification
    
    
import React, { useState, useEffect } from 'react';

import {
    Grid,
    Card,
    Button,
    TextField,
    Typography
} from '@material-ui/core';
import Report from './report'
import { connect } from 'react-redux'

import {getAllReports} from '../DAOs/reportsDAO'

const Admin = (props) => {
    
    const [reports, setReports] = useState([])

    useEffect(() => {
        //console.log('useEffect')
        async function fetchData(token) {
            const response = await getAllReports(token)
            setReports(response)
        }
        fetchData(props.token)
    },
    []
    )


    const _deleteReportFromState = (index) => {
        var newReports = [...reports]
        newReports.splice(index,1)
        setReports(newReports)
    }

    return (
        <div style={styles.container}>
            {(reports instanceof Array) && reports.map((report, index) => (
                <div key={index} style={styles.report}>
                    <Report report={report} deleteReportFromState={() => _deleteReportFromState(index)}></Report>
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.authenticationReducer.isLoggedIn,
    token: state.authenticationReducer.token,
    isAdmin: state.authenticationReducer.isAdmin
})

let styles = {
    container: {
        margin: 20,
        marginTop: 40,
    },
    report: {
        margin: 20,
    }
}

export default connect(mapStateToProps)(Admin)
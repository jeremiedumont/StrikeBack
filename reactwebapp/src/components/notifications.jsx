import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import history from '../history'

import { getNotificationsByUser, deleteNotification } from '../DAOs/notificationsDAO';

import Notification from './notification';

const Notifications = (props) => {

    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        async function fetchData(token) {
            const newNotifs = await getNotificationsByUser(token)
            setNotifications(newNotifs)
        }
        fetchData(props.token)
    },
        [props.token]
    )
    
    const _handleNotificationClick = (notification) => {
        deleteNotification(props.token, notification._id)
        history.push('../fullRemark' + notification.postId)
    }

    return (
            <>
                {(notifications instanceof Array) && notifications.map((notification, index) => (
                    <div key={index} style={styles.notification} onClick={() => _handleNotificationClick(notification)}>
                        <Notification remarkId={notification.postId} numberNotifs={notification.numberNotifs}></Notification>
                    </div>
                ))}
            </>
    )
}

const styles = {
    notifications: {
        margin: 10
    },
    notification: {
        margin: 40
    }
}

const mapStateToProps = (state) => ({
    token: state.authenticationReducer.token,
})

export default connect(mapStateToProps)(Notifications)
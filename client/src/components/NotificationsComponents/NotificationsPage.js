import React , { Component } from 'react';
import { connect } from 'react-redux';

import Notification from './NotificationItem';

class NotificationsPage extends Component {

    componentDidMount(){
        this.props.markAllAsRead();
    }

    componentWillUpdate(){
        this.props.markAllAsRead();
    }

    render(){
        const { notifications } = this.props;
        return(
            <section className = "notifications-section">
                <h2> Notifications </h2>
                { notifications && notifications.map( notification => <Notification {...notification} /> ) }
                {!notifications && (<div className = "notifications-empty-state">
                    <h4>No notifications to display :( </h4>
                </div>) }
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        notifications : state.notification.notifications
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        getNotifications : () => dispatch(getNotificationsAction()),
        markAllAsRead : () => dispatch(markAllAsReadAction())
    }
}



export default connect (mapStateToProps, mapDispatchToProps)(NotificationsPage);
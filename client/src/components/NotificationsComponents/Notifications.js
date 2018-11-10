import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { getNotificationsAction , markAllAsReadAction } from '../../actions/notificationActions';

import NotificationItem from './NotificationItem';

class Notifications extends Component {

    componentDidMount(){
        this.props.markAllAsRead();
    }

    componentWillUpdate(){
        this.props.markAllAsRead();
    }

    render(){
        document.title = "Notifications | Yarns";
        const { notifications, isLoggedIn } = this.props;
        console.log(notifications)
        return(!isLoggedIn) ? <Redirect to="/login" /> :(
            <section className = "notifications-section">
                <h2> Notifications </h2>
                { notifications.length > 0 && (
                    <React.Fragment>
                    <hr className = 'notification-item-firstline' />
                    {notifications.map( notification => <NotificationItem {...notification} key={notification._id}/> )}
                    </React.Fragment>) }
                { notifications.length < 1 && (<div className = "notifications-empty-state">
                    <h4>No notifications to display</h4>
                </div>) }
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        notifications : state.notification.notifications.sort((a,b) => new Date(b.timeCreated) - new Date(a.timeCreated) ),
        isLoggedIn: state.user.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        getNotifications : () => dispatch(getNotificationsAction()),
        markAllAsRead : () => dispatch(markAllAsReadAction())
    }
}



export default connect (mapStateToProps, mapDispatchToProps)(Notifications);
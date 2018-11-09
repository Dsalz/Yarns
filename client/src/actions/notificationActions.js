import axios from 'axios';
import { setupToken } from './tokenActions';

export const markAllAsReadAction = () => {
    return(dispatch) => {
        axios.get('/api/v1/notifications/markAllAsRead' , setupToken() )
        .then(resp => dispatch({type: "MARKED_ALL_AS_READ" , payload: {notifications : resp.data.notifications}}))
        .catch(err => dispatch({type: "ERROR_MARKING_ALL_AS_READ"}))
    }
}

export const getNotificationsAction = () => {
    return (dispatch) => {
        axios.get('/api/v1/notifications' , setupToken())
        .then(resp => dispatch({ type: "GOTTEN_NOTIFICATIONS" , payload: { notifications : resp.data.notifications}}))
        .catch(err => dispatch({ type: "COULDNT_GET_NOTIFICATIONS"}))
    }
}
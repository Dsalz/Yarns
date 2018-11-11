const initState = {
    notifications : [],
    newNotification : 'none'
}

const notificationReducer = ( state = initState , action) => {
    switch (action.type){
        case "GOTTEN_NOTIFICATIONS":
        return{
            ...state,
            notifications : action.payload.notifications,
            newNotification: action.payload.notifications.filter(notification => !notification.isRead)[0] ? true : false
        }

        case "MARKED_ALL_AS_READ" :
        let readNotifs = state.notifications.filter(notif => notif.isRead )
        let unreadNotifs = state.notifications.filter(notif => !notif.isRead )
        let updatedNotifs = unreadNotifs.map(notif => notif.isRead = true);
        return{
            ...state,
            notifications : [...readNotifs , ...updatedNotifs],
            newNotification: false
        }

        default :
        return state
    }
}

export default notificationReducer;
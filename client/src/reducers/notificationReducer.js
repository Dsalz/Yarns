const initState = {
    notifications : [],
    newNotification : false
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
        return{
            ...state,
            notifications : action.payload.notifications,
            newNotification: false
        }

        default :
        return state
    }
}
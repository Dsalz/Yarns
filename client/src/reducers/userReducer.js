const initState = {
    isLoggedIn : false,
    userExists : null,
    usernameAvailable : null,
    token : "",
    loggingIn : false,
    user: { accolades:[], followers:[], followings:[], roomsCreated:0 },
    nightMode: false,
    otherUser: {username: "", name:"", accolades:[], followers:[], followings:[], roomsCreated:0}
};


const userReducer = (state = initState , action) => {

    switch(action.type){
        
        case "SIGNUP_USER":
        return{
            ...state,
            user: action.payload.user,
            token: action.payload.token,
            isLoggedIn: true
        }

        case "CHECKING_USERNAME_AVAILABILITY":
        console.log(state)
        return{
            ...state,
            usernameAvailable: "loading"
        }

        case "TOGGLE_NIGHT_MODE":
        return{
            ...state,
            nightMode: !state.nightMode
        }

        case "USERNAME_AVAILABILITY":
        return{
            ...state,
            usernameAvailable : action.payload === "Not Available" ? false : true
        }

        case "RESET_USERNAME_AVAILABILITY":
        return{
            ...state,
            usernameAvailable: null
        }

        case "LOGGING_IN" :
            return{
                ...state,
                loggingIn: true,
                userExists: null
            }
        

        case "CONFIRMED_LOGIN_STATUS":
        return{
            ...state,
            user: action.payload.user,
            isLoggedIn: true
        }

        case "LOGIN_USER":
        let { validUser } = action.payload;
        return (validUser) ? {
            ...state,
            user: action.payload.user,
            userExists : true,
            token: action.payload.token,
            isLoggedIn : true,
            loggingIn : false
        } : {
            ...state,
            loggingIn : false,
            userExists : false
        }

        case "LOGOUT_USER":
        return {
            ...state,
            user: {},
            isLoggedIn: false,
            token: ""
        }

        case "USER_ACCOLADES_GIVEN":
        return {
            ...state,
            user : {...action.payload.updatedUser}
        }

        case "USER_ACCOLADES_REMOVED":
        return {
            ...state,
            user : {...action.payload.updatedUser}
        }

        case "UPDATED_USER":
        return{
            ...state,
            user: action.payload.user
        }

        case "GOT_OTHER_USER":
        return{
            ...state,
            otherUser: action.payload
        }

        case "FOLLOWED_USER":
        console.log(action.payload.otherUser);
        return{
            ...state,
            user : {
                ...state.user,
                followings: [...state.user.followings , action.payload.username],
                otherUser: {...action.payload.otherUser}
            }
        }

        case "UNFOLLOWED_USER":
        console.log(action.payload.otherUser);
        return {
            ...state,
            user : {
                ...state.user,
                followings: [...state.user.followings].filter(following => following !== action.payload.username),
                otherUser: {...action.payload.otherUser}
            }
        }

        default: 
        return state;

    }
}

export default userReducer;
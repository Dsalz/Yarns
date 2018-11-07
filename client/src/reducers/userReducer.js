const initState = {
    isLoggedIn : false,
    userExists : null,
    usernameAvailable : null,
    token : "",
    loggingIn : false,
    user: {},
    nightMode: false
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

        case "LOGGING_IN" :{
            return{
                ...state,
                loggingIn: true,
                userExists: null
            }
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
            user : action.payload.updatedUser
        }

        case "USER_ACCOLADES_REMOVED":
        return {
            ...state,
            user : action.payload.updatedUser
        }

        default: 
        return state;

    }
}

export default userReducer;
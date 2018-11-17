const initState = {
    isLoggedIn : false,
    userExists : null,
    usernameAvailable : null,
    token : "",
    loading : false,
    user: {username: "", name:"", accolades:[], followers:[], followings:[], roomsCreated:0 },
    nightMode: false,
    otherUser: {username: "", name:"", accolades:[], followers:[], followings:[], roomsCreated:0},
    profileUpdated: null,
    passwordUpdated: null
};


const userReducer = (state = initState , action) => {

    switch(action.type){
        
        case "SIGNUP_USER":
        return{
            ...state,
            user: action.payload.user,
            token: action.payload.token,
            isLoggedIn: true,
            loading: false
        }

        case "CHECKING_USERNAME_AVAILABILITY":
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

        case "LOADING" :
            return{
                ...state,
                loading: true,
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
            loading : false
        } : {
            ...state,
            loading: false,
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
            user: action.payload.user,
            profileUpdated: true
        }

        case "UPDATED_PASSWORD":
        return{
            ...state,
            passwordUpdated: true,
            user: action.payload.user
        }

        case "RESET_PROFILE_UPDATED":
        return{
            ...state,
            profileUpdated: null
        }

        case "RESET_PASSWORD_UPDATED":
        return{
            ...state,
            passwordUpdated: null
        }

        case "GOT_OTHER_USER":
        return{
            ...state,
            otherUser: action.payload,
            loading: false
        }

        case "FOLLOWED_USER":
        return{
            ...state,
            user : {
                ...state.user,
                followings: [...state.user.followings , action.payload.username],
                otherUser: {...action.payload.otherUser}
            }
        }

        case "UNFOLLOWED_USER":
        return {
            ...state,
            user : {
                ...state.user,
                followings: [...state.user.followings].filter(following => following !== action.payload.username),
                otherUser: {...action.payload.otherUser}
            }
        }

        case "STOP_LOADING":
        return{
            ...state,
            loading: false
        }

        default: 
        return state;

    }
}

export default userReducer;
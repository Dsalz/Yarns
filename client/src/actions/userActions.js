import axios from 'axios';
import { storeToken, setupToken } from './tokenActions';

export const toggleNightMode = () => {
    return{
        type: "TOGGLE_NIGHT_MODE"
    }
}

export const checkLoginStatusAction = () =>{
    return(dispatch) => {
        axios.get('/api/v1/users/checkLoginStatus' , setupToken())
        .then(resp => dispatch({type: "CONFIRMED_LOGIN_STATUS" , payload: resp.data}))
        .catch(err => dispatch({type: "COULDNT_CONFIRM_LOGIN_STATUS"}))
    }
}

export const loginAction = (user) => {
    return(dispatch, getState)=> {
        dispatch({ type : "LOGGING_IN"});

        axios.post('/api/v1/users/Login', user)
        .then(resp => { 
            if(resp.data.validUser)storeToken(resp.data.token);
            dispatch({type: "LOGIN_USER" , payload: resp.data})
        })
        .catch(err => console.log(err))

    }
}

export const checkUsernameAvailability = (username) => {
    return(dispatch, getstate) => {
        dispatch({ type : "CHECKING_USERNAME_AVAILABILITY"});

        axios.post('/api/v1/users/CheckUsernameAvailability' , { username })
        .then( resp => dispatch({type: "USERNAME_AVAILABILITY", payload: resp.data.status}))
        .catch(err => console.log(err))
    }
}

export const resetUsernameAvailability = () => {
    return{
        type: "RESET_USERNAME_AVAILABILITY"
    }
}

export const signUpAction = (user) => {
    return (dispatch, getStore) => {
          axios.post('/api/v1/users/SignUp', user)
          .then( resp => {
            storeToken(resp.data.token)
            dispatch({type: "SIGNUP_USER" , payload: { user : resp.data.user , token : resp.data.token } })
        
        })
          .catch(err => console.log(err))  
    }
}

export const logoutUserAction = () => {
    storeToken("");
    return{
        type: "LOGOUT_USER"
    }
}
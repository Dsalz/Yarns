import axios from 'axios';

export const loginAction = (user) => {
    return(dispatch, getState)=> {
        dispatch({ type : "LOGGING_IN"});

        axios.post('/api/v1/users/Login', user)
        .then(resp => dispatch({type: "LOGIN_USER" , payload: resp.data}))
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
          .then( resp => dispatch({type: "SIGNUP_USER" , payload: { user : resp.data.user , token : resp.data.token } }))
          .catch(err => console.log(err))  
    }
}

export const logoutUserAction = () => {
    return{
        type: "LOGOUT_USER"
    }
}
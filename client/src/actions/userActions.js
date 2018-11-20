import axios from 'axios';
import { storeToken, setupToken } from './tokenActions';

export const toggleNightMode = () => {
    return{
        type: "TOGGLE_NIGHT_MODE"
    }
}

export const checkLoginStatusAction = () =>{
    return(dispatch) => {
        axios.get('/api/v1/users/getUser' , setupToken())
        .then(resp =>  console.log(resp) || dispatch({type: "CONFIRMED_LOGIN_STATUS" , payload: resp.data}))
        .catch(err => dispatch({type: "COULDNT_CONFIRM_LOGIN_STATUS", payload: { err }}))
    }
}

export const updateUserAction = () => {
    return(dispatch) => {
        axios.get('/api/v1/users/getUser' , setupToken())
        .then(resp => dispatch({type: "UPDATED_USER" , payload: resp.data}))
        .catch(err => dispatch({type: "COULDNT_UPDATE_USER", payload: { err }}))
    }
}

export const getOtherUserAction =(username) =>{
    return(dispatch) => {
        axios.get('/api/v1/users/getOtherUser/' + username)
        .then(resp => dispatch({type: "GOT_OTHER_USER" , payload:resp.data.user}))
        .catch(err => dispatch({type :"DIDNT_GET_OTHER_USER", payload: { err }}))
    }
}

export const followUserAction = (username) => {
    return(dispatch)=> {
        axios.post('/api/v1/users/followUser', {username} , setupToken())
        .then(resp => dispatch({type: "FOLLOWED_USER" , payload: {username , otherUser: resp.data.user}}))
        .catch(err => dispatch({type:"COULDNT_FOLLOW_USER", payload: { err }}))
    }
}

export const unfollowUserAction = (username) => {
    return(dispatch)=> {
        axios.post('/api/v1/users/unfollowUser', {username} , setupToken())
        .then(resp => dispatch({type: "UNFOLLOWED_USER" , payload:{ username , otherUser: resp.data.user}}))
        .catch(err => dispatch({type:"COULDNT_UNFOLLOW_USER", payload: { err }}))
    }
}

export const editProfileAction = (updatedUser) => {
    return(dispatch)=>{
        alert('right api')
        axios.post('api/v1/users/editProfile', { updatedUser } , setupToken())
        .then(resp => dispatch({type: "UPDATED_USER", payload: resp.data}))
        .catch(err => dispatch({type: "COULDNT_UPDATE_USER", payload: { err }}))
    }
}

export const editPasswordAction = (password) => {
    return(dispatch)=>{
        axios.post('api/v1/users/editPassword', { password } , setupToken())
        .then(resp => dispatch({type: "UPDATED_PASSWORD", payload: resp.data}))
        .catch(err => dispatch({type: "COULDNT_UPDATE_PASSWORD", payload: { err }}))
    }
}

export const resetprofileUpdatedAction =() =>{
    return{
        type: "RESET_PROFILE_UPDATED"
    }
}

export const resetpasswordUpdatedAction =() =>{
    return{
        type: "RESET_PASSWORD_UPDATED"
    }
}

export const loginAction = (user) => {
    return(dispatch, getState)=> {
        dispatch({ type : "LOADING"});

        axios.post('/api/v1/users/Login', user)
        .then(resp => { 
            if(resp.data.validUser)storeToken(resp.data.token);
            dispatch({type: "LOGIN_USER" , payload: resp.data})
        })
        .catch(err => dispatch({type: "COULDNT_LOGIN_USER", payload: { err }}))

    }
}

export const checkUsernameAvailability = (username) => {
    return(dispatch, getstate) => {
        dispatch({ type : "CHECKING_USERNAME_AVAILABILITY"});

        axios.post('/api/v1/users/CheckUsernameAvailability' , { username })
        .then( resp => dispatch({type: "USERNAME_AVAILABILITY", payload: resp.data.status}))
        .catch(err => dispatch({type: "COULDNT_CHECK_USERNAME_AVAILABILITY", payload: { err }}))
    }
}

export const resetUsernameAvailability = () => {
    return{
        type: "RESET_USERNAME_AVAILABILITY"
    }
}

export const signUpAction = (user) => {
    return (dispatch, getStore) => {
         dispatch({ type : "LOADING"});
          axios.post('/api/v1/users/SignUp', user)
          .then( resp => {
            storeToken(resp.data.token)
            dispatch({type: "SIGNUP_USER" , payload: { user : resp.data.user , token : resp.data.token } })
        
        })
        .catch(err => dispatch({type: "COULDNT_SIGN_USER_UP" , payload: { err }}))        
    }
}

export const logoutUserAction = () => {
    storeToken("");
    return{
        type: "LOGOUT_USER"
    }
}
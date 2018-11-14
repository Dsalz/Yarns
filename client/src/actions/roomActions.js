import axios from 'axios';
import { setupToken } from './tokenActions';

export const getLatestRoomsAction = () =>{
    return(dispatch, getState)=>{
        axios.get('/api/v1/rooms/getLatest')
        .then(resp => dispatch({type: "GET_LATEST_ROOMS", payload:resp.data.rooms}))
        .catch(err => dispatch({type: "DIDNT_GET_LATEST_ROOMS"}))
    }
}

export const getUserRoomsAction = (username) => {
    return (username) ? (dispatch)=>{
        axios.get('/api/v1/rooms/getUserRoomsCreated/' + username)
        .then(resp => dispatch({type:"GOT_USER_ROOMS_CREATED", payload: resp.data.rooms}))
        .catch(err => dispatch({type: "DIDNT_GET_USER_ROOMS_CREATED"}))
    }: (dispatch)=>{
        axios.get('/api/v1/rooms/getRoomsICreated', setupToken())
        .then(resp => console.log(resp) || dispatch({type: "GOT_ROOMS_I_CREATED", payload: resp.data.rooms}))
        .catch(err=> dispatch({type: "DIDNT_GET_ROOMS_I_CREATED"}))
    }
}

export const addRoom = (room, houseName) => {
    return(dispatch , getState) =>{
        const roomDto = {
            name: room.name,
            houseName: houseName
        }
        const comment = {
            message: room.commentText,
            roomName: room.name
        }
        const data ={ roomDto , comment}
        axios.post('/api/v1/rooms/add' , data, setupToken())
        .then(resp => {
            dispatch({type: "ROOM_ADDED_SUCCESS", payload: resp.data.room})
        })
        .catch(err => dispatch({type: "ROOM_ADDED_FAILED"}))
    }
}

export const getRoom = (name) =>{
    return(dispatch) => {
        axios.get('/api/v1/rooms/' + name)
        .then(resp => dispatch({type: "GOT_ROOM" , payload: resp.data.room}) )
        .catch(err=> dispatch({type: "DIDNT_GET_ROOM"}))
    }
}
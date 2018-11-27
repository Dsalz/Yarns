import axios from 'axios';
import { setupToken } from './tokenActions';

export const getLatestRoomsAction = () =>{
    return(dispatch, getState)=>{
        axios.get('/api/v1/rooms/getLatest')
        .then(resp => dispatch({type: "GET_LATEST_ROOMS", payload:resp.data}))
        .catch(err => dispatch({type: "DIDNT_GET_LATEST_ROOMS", payload: { err }}))
    }
}

export const getUserRoomsAction = (username) => {
    return (username) ? (dispatch)=>{
        axios.get('/api/v1/rooms/getUserRoomsCreated/' + username)
        .then(resp => dispatch({type:"GOT_USER_ROOMS_CREATED", payload: resp.data}))
        .catch(err => dispatch({type: "DIDNT_GET_USER_ROOMS_CREATED", payload: { err }}))
    }: (dispatch)=>{
        axios.get('/api/v1/rooms/getRoomsICreated', setupToken())
        .then(resp => console.log(resp) || dispatch({type: "GOT_ROOMS_I_CREATED", payload: resp.data}))
        .catch(err=> dispatch({type: "DIDNT_GET_ROOMS_I_CREATED", payload: { err }}))
    }
}

export const addRoomAction = (room, houseName, imgInfo) => {
    return(dispatch , getState) =>{
        const roomDto = {
            name: room.name,
            houseName: houseName
        }
        const comment = {
            message: room.commentText,
            roomName: room.name,
            imageUrl: imgInfo.url,
            imageName: imgInfo.name
        }
        const data ={ roomDto , comment}
        axios.post('/api/v1/rooms/add' , data, setupToken())
        .then(resp => {
            dispatch({type: "ROOM_ADDED_SUCCESS", payload: resp.data })
        })
        .catch(err => dispatch({type: "ROOM_ADDED_FAILED", payload: { err }}))
    }
}

export const getRoomAction = (name) =>{
    return(dispatch) => {
        axios.get('/api/v1/rooms/' + name)
        .then(resp => dispatch({type: "GOT_ROOM" , payload: resp.data }) )
        .catch(err=> dispatch({type: "DIDNT_GET_ROOM", payload: { err }}))
    }
}

export const deleteRoomAction = (id) => {
    return(dispatch) => {
        axios.delete('/api/v1/rooms/' + id , setupToken())
        .then(resp => dispatch({ type: "DELETED_ROOM" , payload: resp.data }))
    }
}

export const resetNewRoomAction = () => {
    return {
        type : "RESET_NEW_ROOM"
    }
}

export const resetCurrentRoomAction = () => {
    return {
        type : "RESET_CURRENT_ROOM"
    }
}
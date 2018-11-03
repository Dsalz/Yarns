import axios from 'axios';

export const getLatestRoomsAction = () =>{
    return{
        type: "GET_LATEST_ROOMS"
    }
}

export const addRoom = (room, houseName) => {
    return(dispatch , getState) =>{
        const state = getState();
        const roomDto = {
            name: room.name,
            houseName: houseName,
            creatorId: state.user.user._id,
            creatorName: state.user.user.username
        }
        const comment = {
            message: room.commentText,
            roomName: room.name,
            authorId: state.user.user._id,
            authorName: state.user.user.username
        }
        const data ={ roomDto , comment}
        axios.post('/api/v1/rooms/add' , data)
        .then(resp => {
            dispatch({type: "COMMENT_ADDED_SUCCESS", payload: resp.data.comment})
            dispatch({type: "ROOM_ADDED_SUCCESS", payload: resp.data.room})
        })
        .catch(err => dispatch({type: "ROOM_ADDED_FAILED"}))
    }
}
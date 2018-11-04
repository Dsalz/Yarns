import axios from 'axios';

export const getComments = (roomName) =>{
    return(dispatch, getStore)=>{
        axios.get('/api/v1/comments/room/' + roomName)
        .then(resp => dispatch({type: "GOT_COMMENTS", payload: resp.data.comments}))
        .catch(err => dispatch({type: "DIDNT_GET_COMMENTS"}))
    }
}

export const addComment = (comment) => {
    return(dispatch, getStore) => {
        const store = getStore();
        axios.post('/api/v1/comments/addComment', comment, setupToken(store))
        .then(resp => dispatch({type: "ADD_COMMENT_SUCCESS", payload: comment }))
        .catch(err => dispatch({type: "ADD_COMMENT_FAILED"}))
    }
}

export const deleteComment = (id) => {
    return(dispatch,getStore) => {
        const store = getStore();
        axios.delete('/api/v1/comments', { id }, setupToken(store))
        .then(resp => dispatch({type: "DELETE_COMMENT_SUCCESS", payload: { id }}))
        .catch(err => dispatch({type: "DELETE_COMMENT_FAILED"}))
    }
}

export const addReply = (reply, commentId) => {
    return(dispatch, getStore)=>{
        const store = getStore();
        
        axios.post('/api/v1/comments/addReply', { reply , commentId }, setupToken(store))
        .then(resp => dispatch({type: "ADD_REPLY_SUCCESS", payload: { updatedComment : resp.data.comment }}))
        .catch(err => dispatch({type: "ADD_REPLY_FAILED"}))
    }
}

export const deleteReply = (id, commentId) => {
    return (dispatch, getStore) => {
        const store = getStore();
        axios.delete('api/v1/comments/deleteReply', { id, commentId }, setupToken(store))
        .then(resp => dispatch({type: "DELETE_REPLY_SUCCESS", payload: { updatedComment : resp.data.comment }}))
        .catch(err => dispatch({type: "DELETE_REPLY_FAILED"}))
    }
}

export const resetReplyAddedAction = () => {
    return{
        type: "RESET_REPLY_ADDED"
    }
}

const setupToken = (store) =>{
    const token = store.user.token;
        return {
            headers:{
                Authorization: "Bearer " + token
            }
        }
}
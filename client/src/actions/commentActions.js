import axios from 'axios';

export const addComment = (comment) => {
    return(dispatch, getStore) => {
        axios.post('/api/v1/comments/addComment', comment)
        .then(resp => dispatch({type: "ADD_COMMENT_SUCCESS", payload: comment }))
        .catch(err => dispatch({type: "ADD_COMMENT_FAILED"}))
    }
}

export const deleteComment = (id) => {
    return(dispatch,getStore) => {
        axios.post('/api/v1/comments/deleteComment', { id })
        .then(resp => dispatch({type: "DELETE_COMMENT_SUCCESS", payload: { id }}))
        .catch(err => dispatch({type: "DELETE_COMMENT_FAILED"}))
    }
}

export const addReply = (reply, commentId) => {
    return(dispatch, getStore)=>{
        const store = getStore();
        const token = store.user.token;
        axios.post('/api/v1/comments/addReply', { reply , commentId, token })
        .then(resp => dispatch({type: "ADD_REPLY_SUCCESS", payload: { reply , commentId }}))
        .catch(err => dispatch({type: "ADD_REPLY_FAILED"}))
    }
}

export const deleteReply = (id, commentId) => {
    return (dispatch, getStore) => {
        axios.post('api/v1/comments/deleteReply', { id, commentId })
        .then(resp => dispatch({type: "DELETE_REPLY_SUCCESS", payload: { id, commentId}}))
        .catch(err => dispatch({type: "DELETE_REPLY_FAILED"}))
    }
}
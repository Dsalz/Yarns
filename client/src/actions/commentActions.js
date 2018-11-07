import axios from 'axios';

export const getComments = (roomName) =>{
    return(dispatch, getStore)=>{
        axios.get('/api/v1/comments/room/' + roomName)
        .then(resp => dispatch({type: "GOT_COMMENTS", payload: resp.data.comments}))
        .catch(err => dispatch({type: "DIDNT_GET_COMMENTS"}))
    }
}

export const addComment = (comment, roomName) => {
    return(dispatch, getStore) => {
        const store = getStore();

        axios.post('/api/v1/comments/addComment', { comment, roomName }, setupToken(store))
        .then(resp => dispatch({type: "ADD_COMMENT_SUCCESS", payload: resp.data.savedComment }))
        .catch(err => dispatch({type: "ADD_COMMENT_FAILED"}))
    }
}

export const deleteComment = (id) => {
    return(dispatch,getStore) => {
        const store = getStore();
        axios.delete('/api/v1/comments/' + id, setupToken(store))
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
        axios.delete('api/v1/comments/deleteReply?id='+ id + "&commentId=" + commentId, setupToken(store))
        .then(resp => dispatch({type: "DELETE_REPLY_SUCCESS", payload: { updatedComment : resp.data.comment }}))
        .catch(err => dispatch({type: "DELETE_REPLY_FAILED"}))
    }
}

export const giveAccolade = (commentId) => {
    return(dispatch, getStore) => {
        const store = getStore();
        axios.post("/api/v1/comments/giveAccolade", { commentId } , setupToken(store))
        .then(resp => {
            dispatch({ type : "COMMENT_ACCOLADES_GIVEN", payload : { updatedComment : resp.data.comment }})
            dispatch({ type : "USER_ACCOLADES_GIVEN", payload : { updatedUser: resp.data.user }})            
        })
        .catch(err => dispatch({type: "COMMENT_ACCOLADES_NOT_GIVEN"}))
    }
}

export const removeAccolade = (commentId) => {
    return(dispatch, getStore) => {
        const store = getStore();
        axios.post("/api/v1/comments/removeAccolade", { commentId } , setupToken(store))
        .then(resp => {
            dispatch({ type : "COMMENT_ACCOLADES_REMOVED", payload : { commentId }})
            dispatch({ type : "USER_ACCOLADES_REMOVED", payload : { commentId }})            
        })
        .catch(err => dispatch({type: "COMMENT_ACCOLADES_NOT_REMOVED"}))
    }
}

export const resetReplyAddedAction = () => {
    return{
        type: "RESET_REPLY_ADDED"
    }
}

export const resetCommentAddedAction = () => {
    return{
        type: "RESET_COMMENT_ADDED"
    }
}

const setupToken = (store) =>{
    let token = store.user.token;
        return {
            headers:{
                Authorization: "Bearer " + token
            }
        }
}
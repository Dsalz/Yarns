import axios from 'axios';
import { setupToken } from './tokenActions';

export const getComments = (roomName) =>{
    return(dispatch, getStore)=>{
        axios.get('/api/v1/comments/room/' + roomName)
        .then(resp => dispatch({type: "GOT_COMMENTS", payload: resp.data.comments}))
        .catch(err => dispatch({type: "DIDNT_GET_COMMENTS", payload: { err }}))
    }
}

export const getUserCommentsAction = (username) =>{

    return(username) ? (dispatch)=>{
        axios.get('/api/v1/comments/getUserComments/' + username)
        .then(resp => dispatch({type: "GOT_USER_COMMENTS" ,payload: resp.data.comments}))
        .catch(err => dispatch({type: "DIDNT_GET_USER_COMMENTS", payload: { err }}))
    } : (dispatch) => {
        axios.get('/api/v1/comments/mine' , setupToken())
        .then(resp => dispatch({type: "GOT_MY_COMMENTS" , payload: resp.data.comments}))
        .catch(err => dispatch({type: "DIDNT_GET_MY_COMMENTS", payload: { err }}))
    }
}

export const getCommentsUserGaveAccoladeAction = (username) => {
    return (username) ? (dispatch)=>{
        axios.get('/api/v1/comments/CommentsWithUserAccolades/' + username)
        .then(resp => dispatch({type: "GOT_COMMENTS_WITH_ACCOLADES" , payload: resp.data.comments}))
        .catch(err => dispatch({type:"DIDNT_GET_COMMENTS_WITH_ACCOLADES", payload: { err }}))
    } : (dispatch) => {
        axios.get('/api/v1/comments/CommentsWithMyAccolades' , setupToken())
        .then(resp => dispatch({type: "GOT_COMMENTS_WITH_MY_ACCOLADES", payload: resp.data.comments}))
        .catch(err => dispatch({type: "DIDNT_GET_COMMENTS_WITH_MY_ACCOLADES", payload: { err }}))
    }
}

export const addComment = (comment, roomName, imgInfo) => {
    return(dispatch, getStore) => {
            const newComment = {
                message: comment.commentText,
                roomName,
                imageUrl: imgInfo.url,
                imageName: imgInfo.name
            }
        axios.post('/api/v1/comments/addComment', { comment : newComment }, setupToken())
        .then(resp => dispatch({type: "ADD_COMMENT_SUCCESS", payload: resp.data.savedComment }))
        .catch(err => dispatch({type: "ADD_COMMENT_FAILED", payload: { err }}))
    }
}

export const deleteComment = (id) => {
    return(dispatch,getStore) => {
        axios.delete('/api/v1/comments/' + id, setupToken())
        .then(resp => dispatch({type: "DELETE_COMMENT_SUCCESS", payload: { id }}))
        .catch(err => dispatch({type: "DELETE_COMMENT_FAILED", payload: { err }}))
    }
}

export const addReply = (reply, commentId) => {
    return(dispatch, getStore)=>{
        
        axios.post('/api/v1/comments/addReply', { reply , commentId }, setupToken())
        .then(resp => dispatch({type: "ADD_REPLY_SUCCESS", payload: { updatedComment : resp.data.comment }}))
        .catch(err => dispatch({type: "ADD_REPLY_FAILED", payload: { err }}))
    }
}

export const deleteReply = (id, commentId) => {
    return (dispatch, getStore) => {
        axios.post('/api/v1/comments/deleteReply' , { id , commentId } , setupToken())
        .then(resp => dispatch({type: "DELETE_REPLY_SUCCESS", payload: { updatedComment : resp.data.comment }}))
        .catch(err => dispatch({type: "DELETE_REPLY_FAILED", payload: { err }}))
    }
}

export const giveAccolade = (commentId) => {
    return(dispatch, getStore) => {
        axios.post("/api/v1/comments/giveAccolade", { commentId } , setupToken())
        .then(resp => {
            dispatch({ type : "COMMENT_ACCOLADES_GIVEN", payload : resp.data })
            dispatch({ type : "USER_ACCOLADES_GIVEN", payload : resp.data })            
        })
        .catch(err => dispatch({type: "COMMENT_ACCOLADES_NOT_GIVEN", payload: { err }}))
    }
}

export const removeAccolade = (commentId) => {
    return(dispatch, getStore) => {
        axios.post("/api/v1/comments/removeAccolade", { commentId } , setupToken())
        .then(resp => {
            dispatch({ type : "COMMENT_ACCOLADES_REMOVED", payload : { updatedComment : resp.data.comment }})
            dispatch({ type : "USER_ACCOLADES_REMOVED", payload : { updatedUser : resp.data.user }})            
        })
        .catch(err => dispatch({type: "COMMENT_ACCOLADES_NOT_REMOVED", payload: { err }}))
    }
}

export const storeImgAction = (fileForm) => {
    return(dispatch)=>{
        dispatch({ type: "LOADING" })
        axios.post('/api/v1/comments/storeImg' ,  fileForm  , setupToken('Content-Type', `multipart/form-data; boundary=${fileForm._boundary}`))
        .then(resp => {
            dispatch({type: "IMAGE_STORED", payload: resp.data})
            dispatch({type: "STOP_LOADING"})
        })
        .catch(err => {
            dispatch({type: "IMAGE_NOT_STORED", payload: { err }})
            dispatch({type: "STOP_LOADING", payload: { err }})        
        })
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

export const resetImgUrlAction = () =>{
    return{
        type: "RESET_IMG_URL"
    }
}
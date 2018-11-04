const initState={
    comments : [],
    replyAdded : null
}

const commentReducer = (state=initState , action) => {
    let updatedComment;
    let otherComments;

    if(action.payload){

        if(action.payload.updatedComment){
            updatedComment = action.payload.updatedComment;
            otherComments = state.comments.filter( comment => comment._id !== updatedComment._id)
        }
        
    }
    switch(action.type){

        case "GOT_COMMENTS":
        return{
            ...state,
            comments : [...action.payload]
        }

        case "ADD_REPLY_SUCCESS":
        return{
            ...state,
            comments : [...otherComments , updatedComment],
            replyAdded: true
        }

        case "RESET_REPLY_ADDED":
        return{
            ...state,
            replyAdded: null
        }

        case "DELETE_REPLY_SUCCESS":
        return{
            ...state,
            comments : [...otherComments , updatedComment],
        }

        default:
        return state
    }
}

export default commentReducer;
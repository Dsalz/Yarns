const initState={
    comments : [],
    replyAdded : null,
    commentAdded: null
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

        case "RESET_COMMENT_ADDED":
        return{
            ...state,
            commentAdded: null
        }
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

        case "ADD_COMMENT_SUCCESS":
        return{
            ...state,
            comments : [...state.comments , action.payload],
            commentAdded: true
        }

        case "DELETE_COMMENT_SUCCESS":
        return{
            ...state,
            comments: state.comments.filter(comment => comment._id !== action.payload.id)
        } 

        case "COMMENT_ACCOLADES_GIVEN":
        return{
            ...state,
            comments: [ ...otherComments , updatedComment]
        }

        case "COMMENT_ACCOLADES_REMOVED":
        return{
            ...state,
            comments: [...otherComments , updatedComment]
        }

        default:
        return state
    }
}

export default commentReducer;
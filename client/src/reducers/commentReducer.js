const initState={
    comments : []
}

const commentReducer = (state=initState , action) => {
    switch(action.type){
        case "COMMENT_ADDED_SUCCESS":
        return{
            ...state,
            comments : [...state.comments, action.payload]
        }
    }
}

export default commentReducer;
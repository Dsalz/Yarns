const initState = {
    
    rooms : [],
    latestrooms : [],
    newRoom : null
}

const roomReducer = (state=initState , action) => {
    switch(action.type){
        case "ADD_ROOM":
        return{
            ...state,
            rooms: [...state.rooms , action.payload]
        };

        case "ROOM_ADDED_SUCCESS":
        return{
            ...state,
            rooms: [...state.rooms, action.payload],
            newRoom: action.payload._id
        }

        case "GET_LATEST_ROOMS":
        return{
            ...state,
            latestrooms: [...state.rooms].sort((a,b) => a.dateCreated- b.dateCreated)
        }

        default:
        return state;
    }
}

export default roomReducer;
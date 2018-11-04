const initState = {
    
    rooms : [
        {name:"jj" , commentNo : 1 , _id : "jj", houseName: "Politics"}
    ],
    latestrooms : [],
    newRoom : null,
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
            newRoom: action.payload.name
        }

        case "ROOM_ADDED_FAILED":
        return{
            ...state
        }

        case "GOT_ROOM":
        return{
            ...state,
            rooms: [...state.rooms, action.payload]
        }

        case "DIDNT_GET_ROOM": 
        return {
            ...state
            //TO DO : add property for loading failed
        }
        case "GET_LATEST_ROOMS":
        return{
            ...state,
            rooms: [...action.payload],
            latestrooms: [...action.payload].sort((a,b) => new Date(b.dateCreated) - new Date(a.dateCreated))
        }

        default:
        return state;
    }
}

export default roomReducer;
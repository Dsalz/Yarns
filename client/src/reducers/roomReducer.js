const initState = {
    
    rooms : [
        {name:"jj" , commentNo : 1 , _id : "jj", houseName: "Politics"}
    ],
    latestrooms : [],
    newRoom : null,
    myRoomsCreated: [],
    userRoomsCreated: []
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

        case "GOT_USER_ROOMS_CREATED":
        return{
            ...state,
            userRoomsCreated : [...action.payload]
        }

        case "GOT_ROOMS_I_CREATED":
        return{
            ...state,
            myRoomsCreated: [...action.payload]
        }

        default:
        return state;
    }
}

export default roomReducer;
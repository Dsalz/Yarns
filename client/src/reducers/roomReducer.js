const initState = {
    
    rooms : [],
    latestrooms : [],
    newRoom : null,
    myRoomsCreated: [],
    userRoomsCreated: [],
    currentRoom : { isActive: true }
}

const roomReducer = (state=initState , action) => {

    // const errRegex = /["DIDNT" , "COULDNT" , "NOT" , "FAILED"]/gi;

    // if(action.payload.success === false || errRegex.test(action.type)){
    //     return {
    //         ...state,
    //         error: action.payload.err
    //     }
    // }
    switch(action.type){
        case "ADD_ROOM":
        return{
            ...state,
            rooms: [...state.rooms , action.payload.room]
        };

        case "ROOM_ADDED_SUCCESS":
        const newRoomAdded = action.payload.room;
        return{
            ...state,
            rooms: [...state.rooms, newRoomAdded ],
            newRoom: newRoomAdded.name
        }

        case "RESET_NEW_ROOM":
        return{
            ...state,
            newRoom: null
        }
        
        case "GOT_ROOM":
        const roomGotten = action.payload.room;
        return(roomGotten) ? {
            ...state,
            rooms: [...state.rooms.filter(room => room._id !== roomGotten._id), roomGotten],
            currentRoom: roomGotten
        } : {
            ...state,
            currentRoom: { isActive : false}
        } 

        case "GET_LATEST_ROOMS":
        const roomsGotten = action.payload.rooms
        return{
            ...state,
            rooms: [...roomsGotten],
            latestrooms: [...roomsGotten].sort((a,b) => new Date(b.dateCreated) - new Date(a.dateCreated))
        }

        case "GOT_USER_ROOMS_CREATED":
        return{
            ...state,
            userRoomsCreated : [...action.payload.rooms]
        }

        case "GOT_ROOMS_I_CREATED":
        return{
            ...state,
            myRoomsCreated: [...action.payload.rooms]
        }

        case "DELETED_ROOM":
        const deletedRoomId = action.payload.id;
        return{
            ...state,
            rooms : state.rooms.filter(room => room._id !== deletedRoomId),
            myRoomsCreated : state.myRoomsCreated.filter(room => room._id !== deletedRoomId),
            currentRoom : {...state.currentRoom , isActive: false}
        }

        case "RESET_CURRENT_ROOM":
        return{
            ...state,
            currentRoom : { isActive : true }
        }

        default:
        return state;
    }
}

export default roomReducer;
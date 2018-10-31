const initState = {
    
    rooms : [
        {id: 1, estateId: 1, houseName: "Politics", houseId: 1,  name: "Buhari Resigns", timeAdded: 5},
        {id: 2, estateId: 2, houseName: "Jokes", houseId: 4,  name: "What did buhari say when the conductor asked him to enter with his change?", timeAdded: 8},
        {id: 3, estateId: 1, houseName: "Job Vacancies", houseId: 6,  name: "Presidency now Vacant, interested candidates should be 70yrs and above", timeAdded: 50},
        {id: 4, estateId: 1, houseName: "Hackathons", houseId: 1,  name: "Google & Github Lekki Hackathon", timeAdded: 51},
        {id: 5, estateId: 3, houseName: "Freelance Work", houseId: 1,  name: "Buhari Resigns", timeAdded: 15},
        {id: 6, estateId: 1, houseName: "Interview Experiences", houseId: 1,  name: "Buhari Resigns" , timeAdded: 3},
        {id: 7, estateId: 2, houseName: "News", houseId: 1,  name: "Buhari Resigns", timeAdded: 7},
        {id: 8, estateId: 3, houseName: "Politics", houseId: 1,  name: "Buhari Resigns" , timeAdded: 1},
    ],
    latestrooms : []
}

const roomReducer = (state=initState , action) => {
    switch(action.type){
        case "ADD_ROOM":
        return{
            ...state,
            rooms: [...state.rooms , action.payload]
        };

        case "GET_LATEST_ROOMS":
        return{
            ...state,
            latestrooms: [...state.rooms].sort((a,b) => a.timeAdded - b.timeAdded)
        }

        default:
        return state;
    }
}

export default roomReducer;
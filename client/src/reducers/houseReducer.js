const initState = {
    houses: [
        {id: 1, estateid : 1, name: "Politics"},
        {id: 2, estateid : 1, name: "Travel"},
        {id: 3, estateid : 1, name: "Food"},
        {id: 4, estateid : 2, name: "Jokes"},
        {id: 5, estateid : 2, name: "Tv"},
        {id: 6, estateid : 3, name: "Job Vacancies"},
        {id: 7, estateid : 3, name: "Career Fairs"},
        {id: 8, estateid : 3, name: "Freelance Work"},
        {id: 9, estateid : 3, name: "Hackathons"},
        {id: 10, estateid : 3, name: "Interview Experiences"},
    ]
}

const houseReducer = (state = initState, action) => {
    switch(action.type){
        default:
        return state;
    }

}

export default houseReducer;
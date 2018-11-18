const initState = {
    houses: [
        {id: 1, estateid : 1, estateName: "General", name: "Politics"},
        {id: 2, estateid : 1, estateName: "General", name: "Travel"},
        {id: 3, estateid : 1, estateName: "General", name: "Food"},
        {id: 4, estateid : 2, estateName: "Entertainment", name: "Jokes"},
        {id: 5, estateid : 2, estateName: "Entertainment", name: "Tv"},
        {id: 6, estateid : 3, estateName: "Career", name: "Job Vacancies"},
        {id: 7, estateid : 3, estateName: "Career", name: "Career Fairs"},
        {id: 8, estateid : 3, estateName: "Career", name: "Freelance Work"},
        {id: 9, estateid : 3, estateName: "Career", name: "Hackathons"},
        {id: 10, estateid : 3, estateName: "Career", name: "Interview Experiences"},
    ]
}

const houseReducer = (state = initState, action) => {
    switch(action.type){
        default:
        return state;
    }

}

export default houseReducer;
const initState = {
    estates: [
        {id: 1, name: "General", img: "/images/generalImg.png"},
        {id: 2, name: "Entertainment", img: "/images/entertainmentImg.png"},
        {id: 3, name: "Career", img: "/images/careerImg.png"}
    ]
}

const estateReducer = (state=initState , action) => {
    switch (action.type){
        default:
        return state;
    }
}

export default estateReducer;
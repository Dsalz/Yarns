const initState = {
    estates: [
        {id: 1, name: "General", img: "/images/generalImg.png", maxImg: "/images/generalImgmax.png"},
        {id: 2, name: "Entertainment", img: "/images/entertainmentImg.png", maxImg: "/images/entertainmentImgmax.png"},
        {id: 3, name: "Career", img: "/images/careerImg.png", maxImg: "/images/careerImgmax.png"}
    ]
}

const estateReducer = (state=initState , action) => {
    switch (action.type){
        default:
        return state;
    }
}

export default estateReducer;
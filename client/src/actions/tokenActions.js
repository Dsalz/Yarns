
export const setupToken = () =>{
    let token = localStorage.YarnsToken;
        return {
            headers:{
                Authorization: "Bearer " + token
            }
        }
}

export const storeToken = (token) =>{
    localStorage.YarnsToken = token
}

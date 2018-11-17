
export const setupToken = (key = null , value = null) =>{
    let token = localStorage.YarnsToken;
    const tokenHeader = {
        headers:{
            Authorization: "Bearer " + token
        }
    };

     if(!key){
        return tokenHeader
     }

     tokenHeader[key] = value;
     return tokenHeader;
        
}

export const storeToken = (token) =>{
    localStorage.YarnsToken = token
}

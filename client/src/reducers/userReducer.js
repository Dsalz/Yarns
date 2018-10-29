const initState = {
    users: [
        {name: "Damola", username:"DamDam", password:"Flames6238", confirmpassword:"Flames6238", age:22 , email:"salisu.damola@yahoo.com"}
    ],
    isLoggedIn : false,
    userExists : null
};


const userReducer = (state = initState , action) => {

    switch(action.type){
        
        case "SIGNUP_USER":
        return{
            ...state,
            users: [ ...state.users , action.payload],
            user: action.payload,
            isLoggedIn: true
        }

        case "LOGIN_USER":
        const { email, password } = action.payload;
        let user = state.users.find(u => u.email === email && u.password === password);
        return (user) ? {
            ...state,
            user,
            userExists : true,
            isLoggedIn : true
        } : {
            ...state,
            userExists : false
        }

        case "LOGOUT_USER":
        return {
            ...state,
            user: {},
            isLoggedIn: false
        }

        default: 
        return state;

    }
}

export default userReducer;
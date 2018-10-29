export const loginAction = (user) => {
    return {
        type: "LOGIN_USER",
        payload: user
    }
}

export const signUpAction = (user) => {
    return {
        type: "SIGNUP_USER",
        payload: user
    }
}

export const logoutUserAction = () => {
    return{
        type: "LOGOUT_USER"
    }
}
const AuthenticationReducer = (
    state = {
        isLoggedIn: false,
        token: null
    },action) => {
        switch (action.type) {
            case 'LOG_IN':
                return {
                    isLoggedIn: true,
                    token: action.token
                }
            case 'LOG_OUT':
                return {
                    isLoggedIn: false,
                    token: null
                }

            default:
                return state
        }
    }
    
export default AuthenticationReducer;
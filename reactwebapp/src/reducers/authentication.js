const AuthenticationReducer = (
    state = {
        isLoggedIn: false,
        token: null
    },action) => {
        switch (action.type) {
            case 'LOG_IN':
                return {
                    isLoggedIn: true,
                    token: action.token,
                    isAdmin: action.isAdmin
                }
            case 'LOG_OUT':
                localStorage.removeItem('pseudo')
                localStorage.removeItem('pwd')
                localStorage.removeItem('token')
                return {
                    isLoggedIn: false,
                    token: null
                }

            default:
                return state
        }
    }
    
export default AuthenticationReducer;
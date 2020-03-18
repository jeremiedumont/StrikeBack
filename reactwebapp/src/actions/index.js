export const login = (token) => {
    return {
        type: 'LOG_IN',
        token: token
    }
}

export const logout = () => {
    return {
        type: 'LOG_OUT'
    }
}
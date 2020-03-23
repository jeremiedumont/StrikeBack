export const login = (token, heards, ups, downs, reports) => {
    return {
        type: 'LOG_IN',
        token: token,
        heards : heards,
        ups : ups,
        downs : downs, 
        reports : reports
    }
}

export const logout = () => {
    return {
        type: 'LOG_OUT'
    }
}



export const addUp = (postId) => {
    return {
        type: 'ADD_UP',
        postId: postId
    }
}

export const addDown = (postId) => {
    return {
        type: 'ADD_DOWN',
        postId: postId
    }
}

export const addReport = (postId) => {
    return {
        type: 'ADD_REPORT',
        postId: postId
    }
}
const PostReducer = (
    state = {
        ups: null,
        downs: null,
        heards: null,
        reports: null
    }, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                heards: action.heards,
                ups: action.ups,
                downs: action.downs,
                reports: action.reports
            }
        case 'ADD_UP':
            return {
                ...state,
                ups: [...state.ups, action.postId]
            }
        case 'ADD_DOWN':
            return {
                ...state,
                downs: [...state.downs, action.postId]
            }
        case 'ADD_REPORT':
            return {
                ...state,
                reports: [...state.reports, action.postId]
            }
        case 'INCREMENT_HEARD':
            return {
                ...state,
                heards: [...state.heards, action.postId]
            }
        case 'DECREMENT_HEARD':
            return {
                ...state,
                heards: [...state.heards.filter(heard => heard !== action.postId)]
            }


        default:
            return state
    }
}

export default PostReducer;
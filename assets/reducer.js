const initialState = {
    tasks: [],
    fetchingInProgress: false
}

export default function tasksReducer(state = initialState, action) {
    switch (action.type) {
        case 'fetch_tasks':
            return {
                ...state,
                fetchingInProgress: true
            }
        case 'fetch_tasks_success':
            return {
             ...state,
                fetchingInProgress: false,
                tasks: action.tasks
            }
        default:
            return state
    }
}
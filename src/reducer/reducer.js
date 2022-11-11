export const initialState = {
    workflowList: []
}

export function reducer(state, action) {
    // console.log("inside reducer state: ", state);
    // console.log("inside reducer action: ", action.payload);
    switch (action.type) {
        case 'ADD_WORKFLOW':
            const index = (state.workflowList).indexOf(action.payload.workflowList);
            const list = (index !== -1) ? (state.workflowList).filter(data => data !== action.payload.workflowList) : [...state.workflowList, action.payload.workflowList];
            // console.log(list);
            return {
                ...state,
                workflowList: list
            }
        default:
            return state;
    }
}
export const initialState = {
    workflowList: []
}

export function reducer(state, action) {
    console.log("inside reducer state: ", state);
    console.log("inside reducer action: ", action.payload);
    switch (action.type) {
        case 'ADD_WORKFLOW':
            const list = [...state.workflowList, action.payload.workflowList];
            return {
                ...state,
                workflowList: [...new Set(list)]
            }
        default:
            return state;
    }
}
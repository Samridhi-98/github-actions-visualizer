export const initialState = {
    selectedWorkflowList: [],
    repoList: []
}

export function reducer(state, action) {
    // console.log("inside reducer state: ", state);
    // console.log("inside reducer action: ", action.payload);
    switch (action.type) {
        case 'ADD_WORKFLOW':
            const index = (state.selectedWorkflowList).indexOf(action.payload.selectedWorkflow);
            const list = (index !== -1) ? (state.selectedWorkflowList).filter(data => data !== action.payload.selectedWorkflow) : [...state.selectedWorkflowList, action.payload.selectedWorkflow];
            // console.log(list);
            return {
                ...state,
                selectedWorkflowList: list
            }
        case 'SET_REPOSITORY':
            const repositories = action.payload.repoList.map(repository => repository.name);
            // console.log(repositories);
            return {
                ...state,
                repoList: repositories
            }
        default:
            return state;
    }
}
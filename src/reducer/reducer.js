export const initialState = {
    selectedWorkflowList: [],
    repoList: [],
    repoWorkflowList: [],
    selectedRepo: ""
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
                selectedRepo: repositories[0],
                repoList: repositories,
            }
        case 'SET_REPO_WORKFLOW':
            // console.log("action: ", action.payload.repoWorkflowList);
            return {
                ...state,
                selectedWorkflowList: [action.payload.repoWorkflowList[0], action.payload.repoWorkflowList[1]],
                repoWorkflowList: action.payload.repoWorkflowList
            }
        default:
            return state;
    }
}
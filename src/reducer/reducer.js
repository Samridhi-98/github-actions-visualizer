import repository from '../repository.json';
import workflow from '../workflowRuns.json';

export const initialState = {
    repoList: repository.list,
    workflow: workflow.list[0].name,
}

export function reducer(state, action) {
    switch (action.type) {
        case 'SET_REPOSITORY':
            const repositories = action.payload.repoList.map(title => title.replace('✓ ', ''));
            return {
                ...state,
                repoList: repositories,
            }
        case 'SET_WORKFLOW':
            return {
                ...state,
                workflow: action.payload.workflow
            }
        default:
            return state;
    }
}
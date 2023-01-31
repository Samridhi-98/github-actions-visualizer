import repository from '../repository.json';

export const initialState = {
    repoList: repository.list,
    workflow: '',
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
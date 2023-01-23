import repository from '../repository.json';

export const initialState = {
    repoList: repository.list,
}

export function reducer(state, action) {
    switch (action.type) {
        case 'SET_REPOSITORY':
            const repositories = action.payload.repoList.map(title => title.replace('✓ ', ''));
            return {
                ...state,
                repoList: repositories,
            }
        default:
            return state;
    }
}
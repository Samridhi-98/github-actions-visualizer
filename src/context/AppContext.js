import { useReducer, createContext } from "react";
import { reducer, initialState } from "../reducer/reducer.js";

export const AppContext = createContext(initialState);

function AppProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState);

    const setRepository = (repoList) => {
        dispatch({ type: 'SET_REPOSITORY', payload: { repoList: repoList.filter(title => title.includes('✓ ')) } });
    }

    const setWorkflowTitle = (workflow) => {
        dispatch({ type: 'SET_WORKFLOW', payload: { workflow: workflow } });
    }

    return (
        <AppContext.Provider value={{ state, setRepository, setWorkflowTitle }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;
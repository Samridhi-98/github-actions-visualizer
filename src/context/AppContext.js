import { useReducer, createContext } from "react";
import { reducer, initialState } from "../reducer/reducer";

export const AppContext = createContext(initialState);

function AppProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState);

    const addWorkflow = (workflow) => {
        dispatch({ type: 'ADD_WORKFLOW', payload: { selectedWorkflow: workflow } });
    }

    const setRepository = (repoList) => {
        dispatch({ type: 'SET_REPOSITORY', payload: { repoList: repoList } })
    }

    return (
        <AppContext.Provider value={{ state, addWorkflow, setRepository }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;
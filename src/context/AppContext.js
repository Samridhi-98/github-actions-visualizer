import { useReducer, createContext } from "react";
import { reducer, initialState } from "../reducer/reducer.js";

export const AppContext = createContext(initialState);

function AppProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState);

    const addWorkflow = (workflow) => {
        dispatch({ type: 'ADD_WORKFLOW', payload: { selectedWorkflow: workflow } });
    }

    const setRepository = (repoList) => {
        dispatch({ type: 'SET_REPOSITORY', payload: { repoList: repoList } });
    }

    const setRepoWorkflowList = (repoWorkflow) => {
        dispatch({ type: 'SET_REPO_WORKFLOW', payload: { repoWorkflowList: repoWorkflow } });
    }

    const setWorkflowRuns = (workflowRuns) => {
        dispatch({ type: 'SET_WORKFLOW_RUNS', payload: { workflowRunsData: workflowRuns } });
    }

    return (
        <AppContext.Provider value={{ state, addWorkflow, setRepository, setRepoWorkflowList, setWorkflowRuns }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;
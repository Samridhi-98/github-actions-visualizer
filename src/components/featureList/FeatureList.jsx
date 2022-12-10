import './FeatureList.css';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

function FeatureList() {

    // eslint-disable-next-line no-unused-vars
    const { addWorkflow, state } = useContext(AppContext);
    // const [workflowData, setworkflowData] = useState(state.repoWorkflowList);

    // const updateWorkflowTitle = (index) => {
    //     const newTitle = (workflowData[index].title.includes('✓ ')) ? workflowData[index].title.replace('✓ ', '') : '✓ ' + workflowData[index].title;

    //     setworkflowData(prevState => {
    //         const newState = prevState.map(workflowData => {
    //             if (workflowData.id === index + 1) {
    //                 return { ...workflowData, title: newTitle };
    //             }
    //             return workflowData;
    //         });
    //         return newState;
    //     });
    //     // console.log("workflowData: ", workflowData);
    // };

    const renderWorkflow = () => {
        // console.log("inside feature: ", state)
        const card = state.repoWorkflowList.map((workflowData, index) => {
            return (
                <div className='card' key={workflowData.id}> {workflowData.name} </div>
                // onClick={() => { updateWorkflowTitle(index); addWorkflow(workflowList[index]) }}
            )
        })
        return card;
    }

    return (
        <>
            <div className='feature-list'>
                <h4>Workflow List</h4>
                {renderWorkflow()}
                {/* <div className='feature-card'>
                </div> */}
            </div>
        </>
    )
}

export default FeatureList;
import './FeatureList.css';
import { workflowList } from '../../data/workflowList';
import { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

function FeatureList() {

    const [workflowData, setworkflowData] = useState(workflowList);
    const { addWorkflow } = useContext(AppContext);

    const updateWorkflowTitle = (index) => {
        const newTitle = (workflowData[index].title.includes('✓ ')) ? workflowData[index].title.replace('✓ ', '') : '✓ ' + workflowData[index].title;

        setworkflowData(prevState => {
            const newState = prevState.map(workflowData => {
                if (workflowData.id === index + 1) {
                    return { ...workflowData, title: newTitle };
                }
                return workflowData;
            });
            return newState;
        });
        // console.log("workflowData: ", workflowData);
    };

    const renderWorkflow = () => {
        const card = workflowData.map((workflowData, index) => {
            return (
                <div className='card' key={workflowData.id} onClick={() => { updateWorkflowTitle(index); addWorkflow(workflowList[index]) }}> {workflowData.title} </div>
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
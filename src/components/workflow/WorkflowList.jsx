import './WorkflowList.css';
import workflow from '../../workflowRuns.json';

function WorkflowList() {

    const list = [...new Set(workflow.list.map(workflow => workflow.name))];

    const renderWorkflow = () => {

        const card = list.map((workflow, index) => {
            return (
                <div className='card' key={index}> {workflow} </div>
                // onClick={() => { updateWorkflowTitle(index); addWorkflow(workflowList[index]) }}
            )
        })
        return card;
    }

    return (
        <>
            <div className='workflow-list'>
                <h4>Workflow List</h4>
                {renderWorkflow()}
            </div>
        </>
    )
}

export default WorkflowList;
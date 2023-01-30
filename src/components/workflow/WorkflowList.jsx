import './WorkflowList.css';
import { useContext } from 'react';
import workflow from '../../workflowRuns.json';
import { AppContext } from '../../context/AppContext.js';
import noDataImage from '../../images/no-data.png';
import { countWordsInString } from '../../helper/Helper';

function WorkflowList() {

    const { state } = useContext(AppContext);

    let list = [];

    const setWorkflow = () => {
        state.repoList.forEach(repo => {
            let title = workflow.list.filter(workflow => workflow.repository_name === repo);
            list.push(...title.map(data => data.name));
        });
        return list.filter((workflow, index) => list.indexOf(workflow) === index);
    }


    const renderWorkflow = () => {

        if (!state.repoList.length) {
            return (
                <div className='no-data'>
                    <img src={noDataImage} alt='no-data' />
                </div>
            )
        }
        else {
            list = setWorkflow();

            const card = list.map((workflow, index) => {
                if (countWordsInString(workflow) > 10) {
                    workflow = workflow.split(/\s+/).slice(0, 9).join(" ");
                }
                return (
                    <div className='card' key={index}> {workflow} </div>
                )
            })
            return card;
        }
    }

    return (
        <>
            <div className='workflow-list'>
                <h4>Workflows</h4>
                {renderWorkflow()}
            </div>
        </>
    )
}

export default WorkflowList;
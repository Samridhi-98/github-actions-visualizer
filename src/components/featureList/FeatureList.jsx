import './FeatureList.css';
import { workflowList } from '../../data/workflowList';

function FeatureList() {


    const renderWorkflow = () => {
        const card = workflowList.map(data => {
            return (
                <div className='card' key={data.id}> {data.title} </div>
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
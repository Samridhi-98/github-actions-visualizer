import './Description.css';
import { maxRun, minRun, setWorkflowPerDayData } from '../../helper/Helper.js';

function Description() {

    // console.log(maxRun.name, " ", minRun.name)
    const workflow = setWorkflowPerDayData();
    // console.log(workflow);

    return (
        <>
            <div className='group1'>
                <p>Workflow runs most</p>
                <h3 className='glow'>{maxRun.name}</h3>
            </div>
            <div className='group2'>
                <p>Workflow runs least</p>
                <h3 className='glow'>{minRun.name}</h3>
            </div>
            <div className='group3'>
                <p>Average runs per day</p>
                <h1 className='glow'>{(workflow.averageNoOfRunsPerDay).toPrecision(4)}</h1>
            </div>
            <div className='group4'>
                <p>Maximum runs per day</p>
                <h1 className='glow'>{workflow.maxNoOfRunPerDay}</h1>
            </div>
            <div className='group5'>
                <p>Minimum runs per day</p>
                <h1 className='glow'>{workflow.minNoOfRunPerDay}</h1>
            </div>
        </>
    );
}

export default Description;
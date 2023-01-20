import './Description.css';
import { setWorkflowPerDayData, filterWorkflowStats } from '../../helper/Helper.js';

function Description() {

    const workflow = setWorkflowPerDayData();
    const stats = filterWorkflowStats();

    const maxFailureRuntime = stats.durations.failure.reduce((run1, run2) => run1.duration > run2.duration ? run1 : run2);
    const maxSuccessRuntime = stats.durations.success.reduce((run1, run2) => run1.duration > run2.duration ? run1 : run2);
    const maxRuntime = Math.max(parseInt(maxFailureRuntime.duration), parseInt(maxSuccessRuntime.duration));


    let resultFailure = Object.values(
        stats.durations.failure.reduce((res, { title }) => {
            res[title] ??= { title, count: 0 };
            res[title].count++;
            return res;
        }, {})
    ).sort((data1, data2) => data2.count - data1.count).slice(0, 4);

    let resultSkipped = Object.values(
        stats.durations.skipped.reduce((res, { title }) => {
            res[title] ??= { title, count: 0 };
            res[title].count++;
            return res;
        }, {})
    ).sort((data1, data2) => data2.count - data1.count).slice(0, 5);

    // console.log(resultFailure.sort((data1, data2) => data2.count - data1.count).slice(0, 3));
    // console.log(resultSkipped.sort((data1, data2) => data2.count - data1.count).slice(0, 5));

    const renderData = (list) => {

        const card = list.map((workflow, index) => {
            return (
                <div className='card' key={index}> {workflow.title} </div>
            )
        })
        return card;
    }

    return (
        <>
            <div className='group1'>
                <p>Max Failure Runtime</p>
                <h4 >{maxFailureRuntime.title} : {maxFailureRuntime.duration} min</h4>
                <p>Max Success Runtime</p>
                <h4>{maxSuccessRuntime.title} : {maxSuccessRuntime.duration} min</h4>
            </div>
            <div className='group2'>
                <h4>Most Skipped Workflow</h4>
                {renderData(resultSkipped)}
            </div>
            <div className='group3'>
                <h4>Most Failed Workflow</h4>
                {renderData(resultFailure)}
            </div>
            <div className='group4'>
                <p>Average runs per day</p>
                <b>{(workflow.averageNoOfRunsPerDay).toPrecision(4)}</b>
                <p>Maximum runs per day</p>
                <b>{workflow.maxNoOfRunPerDay}</b>
                <p>Maximum Runtime</p>
                <b>{maxRuntime} min</b>
            </div>
        </>
    );
}

export default Description;
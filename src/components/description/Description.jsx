import './Description.css';
import { setWorkflowPerDayData, filterWorkflowStats, convertToSeconds } from '../../helper/Helper.js';

function Description() {

    const workflow = setWorkflowPerDayData();
    const stats = filterWorkflowStats();

    const maxFailureRuntime = stats.durations.failure.reduce((run1, run2) => convertToSeconds(run1.duration) > convertToSeconds(run2.duration) ? run1 : run2);
    const maxSuccessRuntime = stats.durations.success.reduce((run1, run2) => convertToSeconds(run1.duration) > convertToSeconds(run2.duration) ? run1 : run2);
    const maxSkippedRuntime = stats.durations.skipped.reduce((run1, run2) => convertToSeconds(run1.duration) > convertToSeconds(run2.duration) ? run1 : run2);
    const maxRuntime = Math.floor((Math.max(convertToSeconds(maxFailureRuntime.duration), convertToSeconds(maxSuccessRuntime.duration))) / 60);

    let resultFailure = Object.values(
        stats.durations.failure.reduce((res, { title, repo }) => {
            res[title] ??= { title, repo, count: 0 };
            res[title].count++;
            return res;
        }, {})
    ).sort((data1, data2) => data2.count - data1.count).slice(0, 4);

    let resultSkipped = Object.values(
        stats.durations.skipped.reduce((res, { title, repo }) => {
            res[title] ??= { title, repo, count: 0 };
            res[title].count++;
            return res;
        }, {})
    ).sort((data1, data2) => data2.count - data1.count).slice(0, 5);

    const renderData = (list) => {
        const card = list.map((workflow, index) => {
            return (
                <div className='card' key={index}>
                    <p>
                        <b>Title: </b>
                        {workflow.title}
                    </p>
                    <p>
                        <b>Repository: </b>
                        {workflow.repo}
                    </p>
                </div>
            )
        })
        return card;
    }

    return (
        <>
            <div className='group1'>
                <div className='card'>
                    <b className='heading'>Max Failure Runtime</b>
                    <p>
                        <b>Workflow Title: </b>{maxFailureRuntime.title}
                    </p>
                    <p>
                        <b>Duration: </b>{maxFailureRuntime.duration} min
                    </p>
                    <p>
                        <b>Repository: </b>{maxFailureRuntime.repo}
                    </p>
                </div>
                <div className='card'>
                    <b className='heading'>Max Success Runtime</b>
                    <p>
                        <b>Workflow Title: </b>{maxSuccessRuntime.title}
                    </p>
                    <p>
                        <b>Duration: </b>{maxSuccessRuntime.duration} min
                    </p>
                    <p>
                        <b>Repository: </b>{maxSuccessRuntime.repo}
                    </p>
                </div>
                <div className='card'>
                    <b className='heading'>Max Skipped Runtime</b>
                    <p>
                        <b>Workflow Title: </b>{maxSkippedRuntime.title}
                    </p>
                    <p>
                        <b>Duration: </b>{maxSkippedRuntime.duration} min
                    </p>
                    <p>
                        <b>Repository: </b>{maxSkippedRuntime.repo}
                    </p>
                </div>
            </div>
            <div className='group2'>
                <h4>Most Failed Workflow</h4>
                {renderData(resultFailure)}
            </div>
            <div className='group3'>
                <h4>Most Skipped Workflow</h4>
                {renderData(resultSkipped)}
            </div>
            <div className='group4'>
                <div className='card'>
                    <p>Average no of runs per day :<b> {(workflow.averageNoOfRunsPerDay).toFixed(2)}</b></p>
                </div>
                <div className='card'>
                    <p>Maximum no of runs per day :<b> {workflow.maxNoOfRunPerDay}</b></p>
                </div>
                <div className='card'>
                    <p>Maximum Runtime :<b> {maxRuntime} min</b></p>
                </div>
            </div>
        </>
    );
}

export default Description;
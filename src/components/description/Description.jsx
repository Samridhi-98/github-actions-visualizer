import './Description.css';
import { setWorkflowPerDayData, filterWorkflowStats, convertToSeconds, calculatePercentage } from '../../helper/Helper.js';

function Description() {

    const workflow = setWorkflowPerDayData();
    const stats = filterWorkflowStats();

    const maxFailureRuntime = stats.durations.failure.reduce((run1, run2) => convertToSeconds(run1.duration) > convertToSeconds(run2.duration) ? run1 : run2);
    const maxSuccessRuntime = stats.durations.success.reduce((run1, run2) => convertToSeconds(run1.duration) > convertToSeconds(run2.duration) ? run1 : run2);
    const maxSkippedRuntime = stats.durations.skipped.reduce((run1, run2) => convertToSeconds(run1.duration) > convertToSeconds(run2.duration) ? run1 : run2);
    const maxRuntime = Math.floor((Math.max(convertToSeconds(maxFailureRuntime.duration), convertToSeconds(maxSuccessRuntime.duration))) / 60);

    let resultFailure = Object.values(
        stats.durations.failure.reduce((res, { title, repo, duration }) => {
            duration = convertToSeconds(duration);
            res[title] ??= { title, repo, duration, count: 0 };
            res[title].duration += duration;
            res[title].count++;
            return res;
        }, {})
    ).sort((data1, data2) => data2.count - data1.count).slice(0, 4);

    let resultSkipped = Object.values(
        stats.durations.skipped.reduce((res, { title, repo, duration }) => {
            duration = convertToSeconds(duration);
            res[title] ??= { title, repo, duration, count: 0 };
            res[title].duration += duration;
            res[title].count++;
            return res;
        }, {})
    ).sort((data1, data2) => data2.count - data1.count).slice(0, 5);

    const renderData = (list) => {
        const card = list.map((workflow, index) => {
            const percentage = calculatePercentage(workflow.count);
            return (
                <div className='card' key={index}>
                    <p><b>Title: </b>{workflow.title}</p>
                    <p> <b>Repository: </b>{workflow.repo}</p>
                    <p><b>Percentage: </b>{percentage} %</p>
                    <p><b>Average Runtime: </b>{Math.floor(workflow.duration / workflow.count)} sec</p>
                </div>
            )
        })
        return card;
    }

    const renderRuntimeStats = (runtime, heading) => {
        return (
            <div className='card'>
                <b className='heading'>{heading}</b>
                <p> <b>Workflow Title: </b>{runtime.title}</p>
                <p><b>Duration: </b>{runtime.duration} min</p>
                <p><b>Repository: </b>{runtime.repo}</p>
            </div>
        )
    }

    return (
        <>
            <div className='max-runtime-section'>
                <h4>Runtime Statistics</h4>
                {renderRuntimeStats(maxFailureRuntime, "Max Failure Runtime")}
                {renderRuntimeStats(maxSuccessRuntime, "Max Success Runtime")}
                {renderRuntimeStats(maxSkippedRuntime, "Max Skipped Runtime")}
            </div>
            <div className='failed-workflows-section'>
                <h4>Most Failed Workflows</h4>
                {renderData(resultFailure)}
            </div>
            <div className='skipped-workflows-section'>
                <h4>Most Skipped Workflows</h4>
                {renderData(resultSkipped)}
            </div>
            <div className='aggregate-stats-section'>
                <h4>Aggregate Statistics</h4>
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
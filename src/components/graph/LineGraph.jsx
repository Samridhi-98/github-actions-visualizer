import './Graph.css';
import { Line } from "react-chartjs-2";
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext.js';
import { useEffect } from 'react';

function LineGraph() {

    const [workflowRunsStats, setWorkflowRunsStats] = useState({});
    const { state } = useContext(AppContext);

    useEffect(() => {
        const stats = {
            conclusion: {
                success: 0,
                failure: 0,
                cancelled: 0,
                skipped: 0,
                startup_failure: 0
            },
            durations: {
                success: [0],
                failure: [0],
                cancelled: [0],
                skipped: [0],
                startup_failure: [0],
            },
            earliestRun: new Date(8640000000000000).getTime(),
            latestRun: new Date(-8640000000000000).getTime()
        }
        // console.log(state.workflowRunsData);
        for (const run of state.workflowRunsData) {
            // console.log(run);
            if (!run.conclusion) {
                console.log("run: ", run.conclusion);
                continue;
            }
            stats.conclusion[run.conclusion] += 1
            const createdAtTime = Date.parse(run.created_at)
            const updatedAtTime = Date.parse(run.updated_at)
            const durationMs = updatedAtTime - createdAtTime
            if (stats.durations[run.conclusion]?.push) {
                stats.durations[run.conclusion].push(durationMs / 1000)
            }
            stats.earliestRun = Math.min(stats.earliestRun, createdAtTime)
            stats.latestRun = Math.max(stats.latestRun, createdAtTime)
        }

        // console.log("stats: ", stats)
        setWorkflowRunsStats(stats);
        if (workflowRunsStats.durations) {
            // console.log(workflowRunsStats.durations.success.map(successDuration => { return successDuration / 60 }))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.workflowRunsData])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Success and Failure ',
            },
        },
    };


    const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Success',
                data: [3516410, 1371390, 2477380, 3615610, 7235390, 8877380],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Failure',
                data: [8137119, 9431691, 10266674, 1519410, 1478390, 18361750],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    return <Line height={100} options={options} data={data} />;
}


export default LineGraph;
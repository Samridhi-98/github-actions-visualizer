import './Graph.css';
import { Line } from "react-chartjs-2";
import workflow from '../../workflowRuns.json';

function MultiLineGraph() {

    let stats = {
        durations: {
            success: [],
            failure: [],
            skipped: [],
        }
    }

    const filterWorkflowStats = () => {

        for (const run of workflow.list) {
            const createdAtTime = Date.parse(run.created_at)
            const updatedAtTime = Date.parse(run.updated_at)
            const durationMs = updatedAtTime - createdAtTime
            if (stats.durations[run.conclusion]?.push) {
                stats.durations[run.conclusion].push(durationMs / 1000)
            }
        }
        // const successAverage = (stats.durations.success.reduce((val1, val2) => val1 + val2, 0)) / stats.durations.success.length || 0;
        // const failureAverage = (stats.durations.failure.reduce((val1, val2) => val1 + val2, 0)) / stats.durations.failure.length || 0;
        // const skippedAverage = (stats.durations.skipped.reduce((val1, val2) => val1 + val2, 0)) / stats.durations.skipped.length || 0;
        // console.log("stats: ", stats)
        // console.log(successAverage, " - ", failureAverage, " - ", skippedAverage);
    }

    filterWorkflowStats();

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Duration of runs in seconds',
            }
        },
        scales: {
            y: {
                display: true,
                type: 'logarithmic',
            },

        }
    };

    const labels = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];

    const success = Object.values(stats.durations.success).sort(() => Math.random() - 0.5);
    const failure = Object.values(stats.durations.failure).sort(() => Math.random() - 0.5);
    const skipped = Object.values(stats.durations.skipped).sort(() => Math.random() - 0.5);


    const data = {
        labels,
        datasets: [
            {
                label: 'Success',
                data: success.map(data => data / 60).slice(10),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Failure',
                data: failure.map(data => data / 60).slice(10),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Skipped',
                data: skipped.map(data => data / 60).slice(10),
                borderColor: 'rgb(255, 201, 153)',
                backgroundColor: 'rgba(255, 201, 153,0.5)',
            },
        ],
    };
    return <Line height={100} options={options} data={data} />;
}


export default MultiLineGraph;
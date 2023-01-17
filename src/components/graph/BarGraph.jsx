import './Graph.css';
import { Bar } from "react-chartjs-2";
import workflow from '../../workflowRuns.json';

function BarGraph() {

    let stats = {
        durations: {
            success: [],
            failure: [],
            cancelled: [],
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

        // console.log("stats: ", stats)
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
                text: 'Duration of runs per day',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 4
            }
        }
    }

    const labels = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];

    const success = Object.values(stats.durations.success).sort(() => Math.random() - 0.5);
    const failure = Object.values(stats.durations.failure).sort(() => Math.random() - 0.5);
    // const skipped = Object.values(stats.durations.skipped).sort(() => Math.random() - 0.5);

    const data = {
        labels,
        datasets: [
            {
                label: 'Success',
                data: success.map(data => data / 60).slice(10),
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Failure',
                data: failure.map(data => data / 60).slice(10),
                borderColor: 'rgb(53, 162, 235)',
                borderWidth: 2,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            // {
            //     label: 'Skipped',
            //     data: skipped.map(data => data / 60).slice(10),
            //     borderColor: 'rgb(57, 87, 52)',
            //     borderWidth: 2,
            //     backgroundColor: 'rgba(57, 87, 52,0.5)',
            // },
        ],
    };
    return <Bar height={100} options={options} data={data} />;
}


export default BarGraph;
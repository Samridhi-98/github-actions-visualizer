import './Graph.css';
import { Line } from "react-chartjs-2";
import { filterWorkflow } from '../../helper/Helper';

function MultiLineGraph() {

    const stats = filterWorkflow();

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
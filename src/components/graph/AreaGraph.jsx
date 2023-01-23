import './Graph.css';
import { Line } from 'react-chartjs-2';
import { workflowCountList } from '../../helper/Helper.js';

function AreaGraph() {

    let list = workflowCountList();

    list = list.slice().sort((val1, val2) => val2.duration - val1.duration).slice(0, 20);
    const averageRuntime = list.map(data => (data.duration / data.frequency).toFixed(2));

    // console.log(list)

    const labels = (list.map(data => { return (data.name).split(/\s+/).slice(0, 4).join(" ") }));

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Workflow Dataset',
            }
        },
        scales: {
            y: {
                display: true,
                type: 'logarithmic',
            },

        }
    };

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Frequency',
                data: list.map(data => data.frequency),
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, 'rgba(75,192,192,0)');
                    gradient.addColorStop(0.5, 'rgba(255, 201, 153,0.5)');
                    gradient.addColorStop(1, 'rgba(75,192,192,0.5)');
                    return gradient;
                },
            },
            {
                label: 'Average Runtime',
                pointRadius: 5,
                data: averageRuntime,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    return <Line height={80} options={options} data={data} />;
}

export default AreaGraph;

import './Graph.css';
import { Line } from 'react-chartjs-2';
import workflow from '../../workflowRuns.json';

function AreaGraph() {

    let list = [];

    const workflowCountList = () => {

        for (const data of workflow.list) {

            let run = {
                "name": data.name,
                "frequency": 1
            };

            const pair = list.find(workflow => workflow.name === data.name);
            const index = list.indexOf(pair);

            if (pair === undefined) {
                list.push(run)
            }
            else {
                list[index].frequency += 1;
            }
        }
        list.sort(() => Math.random() - 0.5);

        return list;
    }

    workflowCountList();

    const labels = (list.map(data => { return (data.name).split(/\s+/).slice(0, 4).join(" ") }));

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'No of workflow run',
            }
        },
    };

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Workflows',
                data: (list.map(data => data.frequency)),
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
        ],
    };

    return <Line height={80} options={options} data={data} />;
}

export default AreaGraph;

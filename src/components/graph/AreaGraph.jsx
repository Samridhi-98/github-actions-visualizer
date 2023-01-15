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

    // console.log("list: ", (list.map(data => { return (data.name).split(/\s+/).slice(0, 4).join(" ") })));

    const labels = (list.map(data => { return (data.name).split(/\s+/).slice(0, 4).join(" ") }));

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Workflows run per day',
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Workflows',
                data: (list.map(data => data.frequency)),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return <Line height={100} options={options} data={data} />;
}

export default AreaGraph;

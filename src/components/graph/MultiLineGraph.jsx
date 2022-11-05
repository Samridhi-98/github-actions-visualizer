import './Graph.css';
import { Line } from "react-chartjs-2";

function MultiLineGraph() {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Total Runs of workflow',
            },
        },
    };


    const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [3516410, 1371390, 2477380, 3615610, 7235390, 8877380],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: [8137119, 9431691, 10266674, 1519410, 1478390, 18361750],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: [8137119, 9434691, 12263584, 1315610, 1678390, 19121750],
                borderColor: 'rgb(94, 65, 129)',
                backgroundColor: 'rgba(94, 65, 129,0.5)',
            },
            {
                label: 'Dataset 2',
                data: [9137119, 8471691, 17266674, 1516410, 1098390, 13661750],
                borderColor: 'rgb(57, 87, 52)',
                backgroundColor: 'rgba(57, 87, 52,0.5)',
            },
        ],
    };
    return <Line height={100} options={options} data={data} />;
}


export default MultiLineGraph;
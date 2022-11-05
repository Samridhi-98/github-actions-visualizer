import './Graph.css';
import { Line } from 'react-chartjs-2';

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top'
        },
        title: {
            display: true,
            text: 'Success Stats',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May'];

export const data = {
    labels,
    datasets: [
        {
            fill: true,
            label: 'Dataset',
            data: [1216410, 1371390, 1477380, 1234567, 1347645],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

function AreaGraph() {
    return <Line height={100} options={options} data={data} />;
}

export default AreaGraph;

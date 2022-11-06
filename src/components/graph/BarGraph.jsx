import './Graph.css';
import { Bar } from "react-chartjs-2";

function BarGraph() {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Total no of runs per day',
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [1216410, 1371390, 1477380, 1234567, 1347645],
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: [8137119, 9434691, 12263584, 1315610, 1678390],
                borderColor: 'rgb(53, 162, 235)',
                borderWidth: 2,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    return <Bar height={100} options={options} data={data} />;
}


export default BarGraph;
import './Graph.css';
import { Line } from "react-chartjs-2";

function LineGraph() {

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
        ],
    };
    return <Line height={100} options={options} data={data} />;
}


export default LineGraph;
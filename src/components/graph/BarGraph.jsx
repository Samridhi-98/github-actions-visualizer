import './Graph.css';
import { Bar } from "react-chartjs-2";
import { filterYearWiseData, MONTH } from '../../helper/Helper';

function BarGraph() {

    let year21 = [...Array(12).fill(0)];
    let year22 = [...Array(12).fill(0)];
    let year23 = [...Array(12).fill(0)];


    const list = filterYearWiseData();

    Object.values(list)[0].map(data => year21[MONTH.indexOf(data.month)] = data.run);
    Object.values(list)[1].map(data => year22[MONTH.indexOf(data.month)] = data.run);
    Object.values(list)[2].map(data => year23[MONTH.indexOf(data.month)] = data.run);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Total workflow runs per month',
            },
        },
        scales: {
            yAxes: {
                max: 1000
            }
        }
    }

    const labels = MONTH;

    const data = {
        labels,
        datasets: [
            {
                label: '2021',
                data: year21,
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: '2022',
                data: year22,
                borderColor: 'rgb(57, 87, 52)',
                borderWidth: 2,
                backgroundColor: 'rgba(57, 87, 52,0.5)',
            },
            {
                label: '2023',
                data: year23,
                borderColor: 'rgb(255, 159, 64)',
                borderWidth: 2,
                backgroundColor: 'rgba(255, 159, 64, 0.5)',
            },
        ],
    };
    return <Bar height={100} options={options} data={data} />;
}


export default BarGraph;
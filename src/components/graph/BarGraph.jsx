import './Graph.css';
import { Bar } from "react-chartjs-2";
import workflow from '../../workflowRuns.json';

function BarGraph() {

    let list = {};
    let year21 = [...Array(12).fill(0)];
    let year22 = [...Array(12).fill(0)];
    let year23 = [...Array(12).fill(0)];

    const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const filterYearWiseData = () => {

        for (const data of workflow.list) {

            let year = new Date(data.created_at).getFullYear();
            let month = MONTH[new Date(data.created_at).getMonth()];

            if (!list[year]) {
                list[year] = [];
            }

            if (list[year].find(data => data.month === month) === undefined) {
                let value = {
                    "month": month,
                    "run": 0
                }
                list[year].push(value);
            }
            list[year].map(data => data.run++);
        }

        Object.values(list)[0].forEach(data => year21[MONTH.indexOf(data.month)] = data.run);
        Object.values(list)[1].forEach(data => year22[MONTH.indexOf(data.month)] = data.run);
        Object.values(list)[2].forEach(data => year23[MONTH.indexOf(data.month)] = data.run);
        console.log(Object.keys(list));
    }
    filterYearWiseData();

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Total workflow runs per year',
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
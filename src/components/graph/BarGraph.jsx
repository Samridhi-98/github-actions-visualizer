import './Graph.css';
import { Bar } from "react-chartjs-2";
import { filterHourlyData } from '../../helper/Helper';

function BarGraph() {

    const list = filterHourlyData();

    // console.log(Object.values(list).map(data => data.length).sort((val1, val2) => val2 - val1).slice(0, 15));

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Number of runs per hour',
            },
        },
        scales: {
            yAxes: {
                max: 60
            }
        }
    }

    const labels = Object.keys(list).map(data => parseInt(data));

    const data = {
        labels,
        datasets: [
            {
                label: 'Hourly',
                data: Object.values(list).map(data => data.length),
                borderColor: 'rgb(57, 87, 52)',
                borderWidth: 2,
                backgroundColor: 'rgba(57, 87, 52,0.5)',
            },
        ],
    };
    return <Bar height={100} options={options} data={data} />;
}


export default BarGraph;
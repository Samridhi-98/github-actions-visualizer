import './Graph.css';
import { Bar } from "react-chartjs-2";
import { filterHourlyData } from '../../helper/Helper';

function BarGraph() {

    const list = filterHourlyData();

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Duration of runs per hour',
            },
        },
        // scales: {
        //     yAxes: {
        //         max: 3800
        //     }
        // }
    }

    const labels = Object.keys(list).map(data => parseInt(data));

    const data = {
        labels,
        datasets: [
            {
                label: 'Hourly',
                data: Object.values(list).map(data => Math.floor(data.duration / 60)),
                borderColor: 'rgb(57, 87, 52)',
                borderWidth: 2,
                backgroundColor: 'rgba(57, 87, 52,0.5)',
            },
        ],
    };
    return <Bar height={100} options={options} data={data} />;
}


export default BarGraph;
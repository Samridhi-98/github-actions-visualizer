import './Graph.css';
import { Bar } from "react-chartjs-2";
import { filterWorkflowStats } from '../../helper/Helper.js';

function ConclusionPercentageGraph() {

    const stats = filterWorkflowStats();
    const total = (Object.values(stats.conclusion)).reduce((val1, val2) => val1 + val2, 0);
    const conclusionPercentage = (Object.values(stats.conclusion)).map(val => (val * 100) / total);

    const options = {
        responsive: true,
        indexAxis: 'y',
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Workflows Conclusion Percentage',
            }
        }
    };

    const labels = Object.keys(stats.conclusion);

    const data = {
        labels,
        datasets: [
            {
                label: 'Percentage',
                data: conclusionPercentage,
                borderWidth: 2,
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            }
        ],
    };
    return <Bar height={100} options={options} data={data} />;
}


export default ConclusionPercentageGraph;
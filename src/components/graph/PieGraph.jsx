import './Graph.css';
import { Pie } from 'react-chartjs-2';
import { filterWorkflowStats } from '../../helper/Helper';

function PieGraph() {

    const stats = filterWorkflowStats();
    const total = (Object.values(stats.conclusion)).reduce((val1, val2) => val1 + val2, 0);
    const conclusionPercentage = (Object.values(stats.conclusion)).map(val => (val * 100) / total)

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        }
    }

    const data = {
        labels: Object.keys(stats.conclusion),
        datasets: [
            {
                label: '',
                data: conclusionPercentage,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 2,
            },
        ],
    };

    return <Pie data={data} options={options} />;
}

export default PieGraph;  
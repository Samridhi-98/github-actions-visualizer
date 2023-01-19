import './Graph.css';
import { Pie } from 'react-chartjs-2';
import { filterWorkflowStats } from '../../helper/Helper';

function PieGraph() {

    const stats = filterWorkflowStats();

    const data = {
        labels: Object.keys(stats.conclusion),
        datasets: [
            {
                label: '',
                data: Object.values(stats.conclusion),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(57, 87, 52, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(57, 87, 52, 1)'
                ],
                borderWidth: 2,
            },
        ],
    };

    return <Pie data={data} />;
}

export default PieGraph;  
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
    const height = (window.innerHeight < 920 && window.innerWidth < 920) ? 200 : 100;
    const data = {
        labels,
        datasets: [
            {
                label: 'Percentage',
                data: conclusionPercentage,
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, 'rgba(54, 162, 235, 0)');
                    gradient.addColorStop(0.5, 'rgba(255, 99, 132, 0.5)');
                    gradient.addColorStop(1, 'rgba(75,192,192,0.5)');
                    return gradient;
                },
            }
        ],
    };
    return <Bar height={height} options={options} data={data} />;
}


export default ConclusionPercentageGraph;
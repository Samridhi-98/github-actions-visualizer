import './Graph.css';
import { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { AppContext } from '../../context/AppContext.js';
import workflow from '../../workflowRuns.json';
import noDataImage from '../../images/no-data.png';
import useWindowDimensions from '../../hooks/useWindowsDimension.js';

function TotalRuntimeGraph() {

    const { state } = useContext(AppContext);
    const { innerHeight, innerWidth } = useWindowDimensions();

    const workflowCountList = () => {

        let list = [];

        for (const data of workflow.list) {
            if (state.repoList.find(repo => repo === data.repository_name) !== undefined) {
                const createdAtTime = Date.parse(data.created_at);
                const updatedAtTime = Date.parse(data.updated_at);
                const durationMin = Math.floor(((updatedAtTime - createdAtTime) / 1000 / 60) % 60);

                let run = {
                    "name": data.name,
                    "duration": durationMin
                };

                const pair = list.find(workflow => workflow.name === data.name);
                const index = list.indexOf(pair);

                if (pair === undefined) {
                    list.push(run)
                }
                else {
                    list[index].duration += durationMin;
                }
            }
        };
        return list;
    }

    if (!state.repoList.length) {
        return (
            <div className='no-data'>
                <img src={noDataImage} alt='no-data' />
            </div>
        )
    }
    else {
        let list = workflowCountList();
        list = list.slice().sort((val1, val2) => val2.duration - val1.duration).slice(0, 20);
        const totalRuntime = list.map(data => (data.duration));

        const labels = (list.map(data => { return (data.name).substring(0, 15) }));
        const height = (innerHeight < 920 && innerWidth < 920) ? 250 : 100;
        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Most Resource Intensive Workflows',
                }
            }
        };

        const data = {
            labels,
            datasets: [
                {
                    label: 'Total Runtime in min',
                    data: totalRuntime,
                    borderWidth: 0.5,
                    borderColor: 'rgba(75,192,192,1)',
                    backgroundColor: (context) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 500);
                        gradient.addColorStop(0, 'rgba(75,192,192,0)');
                        gradient.addColorStop(0.5, 'rgba(255, 201, 153,0.5)');
                        gradient.addColorStop(1, 'rgba(75,192,192,0.5)');
                        return gradient;
                    },
                },
            ],
        };

        return <Bar height={height} options={options} data={data} />;
    }
}

export default TotalRuntimeGraph;

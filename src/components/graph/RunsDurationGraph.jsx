import './Graph.css';
import { useContext } from 'react';
import { Bar } from "react-chartjs-2";
import workflow from '../../workflowRuns.json';
import { AppContext } from '../../context/AppContext.js';
import noDataImage from '../../images/no-data.png';

function RunsDurationGraph() {

    const { state } = useContext(AppContext);

    const filterHourlyData = () => {

        let list = {};

        for (const run of workflow.list) {

            if (state.repoList.find(repo => repo === run.repository_name) !== undefined) {

                let hours = new Date(run.created_at).getHours();

                const createdAtTime = Date.parse(run.created_at);
                const updatedAtTime = Date.parse(run.updated_at);
                const durationSec = Math.floor(((updatedAtTime - createdAtTime) / 1000) % 60);

                let time = hours;

                let data = {
                    "noOfRuns": 1,
                    "duration": durationSec
                }

                if (!list[time]) {
                    list[time] = data;
                }
                else {
                    list[time].noOfRuns += 1;
                    list[time].duration += durationSec;
                }
            }
        }

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
        }

        const labels = Object.keys(list).map(data => parseInt(data));
        const height = window.innerHeight < 920 ? 200 : 100;

        const data = {
            labels,
            datasets: [
                {
                    label: 'Hourly',
                    data: Object.values(list).map(data => Math.floor(data.duration / 60)),
                    borderColor: 'rgb(57, 87, 52)',
                    borderWidth: 1,
                    backgroundColor: (context) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                        gradient.addColorStop(0, 'rgba(57, 87, 52,0)');
                        gradient.addColorStop(0.5, 'rgba(255, 201, 153,0.5)');
                        gradient.addColorStop(1, 'rgba(75,192,192,0.5)');
                        return gradient;
                    },
                }
            ],
        };
        return <Bar height={height} options={options} data={data} />;
    }
}


export default RunsDurationGraph;
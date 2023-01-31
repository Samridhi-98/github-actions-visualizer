/* eslint-disable array-callback-return */
import './Statistics.css';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext.js';
import workflow from '../../workflowRuns.json';
import GaugeChart from 'react-gauge-chart'

function Statistics() {

    const { state } = useContext(AppContext);
    let stats = {
        title: '',
        duration: 0,
        conclusion: {
            success: 0,
            failure: 0,
            skipped: 0,
            action_required: 0
        },
        count: 0,
    }
    const getWorkflowStatstics = () => {
        workflow.list.map(data => {
            if (state.workflow && state.workflow === data.name) {
                const createdAtTime = Date.parse(data.created_at);
                const updatedAtTime = Date.parse(data.updated_at);
                const duration = Math.floor(((updatedAtTime - createdAtTime) / 1000) % 60);
                if (stats.conclusion[data.conclusion] !== undefined) {
                    stats.conclusion[data.conclusion] += 1;
                }
                stats.title = data.name;
                stats.duration += duration;
                stats.count++;
            }
        })
        console.log(stats)
        return stats;
    }
    getWorkflowStatstics();

    const setWorkflowStatstics = () => {
        const successValue = stats.conclusion["success"];
        const total = Object.values(stats.conclusion).reduce((val1, val2) => val1 + val2);
        const percentage = successValue / total;
        return (
            <div>
                <b>{"Success Rate"}</b>
                <GaugeChart id="gauge-chart6" colors={["#FF5F6D", "#FFC371"]} nrOfLevels={30} percent={percentage} />
                <b className='title'>{stats.title}</b>
                <p>
                    <b>Average Runtime: </b>
                    {Math.floor(stats.duration / stats.count)} sec
                </p>
            </div>
        )
    }

    return (
        <>
            <div className='stats'>
                <h4>Statistics</h4>
                {setWorkflowStatstics()}
            </div>
        </>
    )
}

export default Statistics;
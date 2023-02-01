/* eslint-disable array-callback-return */
import './Statistics.css';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext.js';
import workflow from '../../workflowRuns.json';
import GaugeChart from 'react-gauge-chart'

function Statistics() {

    const { state } = useContext(AppContext);
    let stats = {
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
                stats.duration += duration;
                stats.count++;
            }
        })
        return stats;
    }
    getWorkflowStatstics();

    const setWorkflowStatstics = () => {
        const successValue = stats.conclusion["success"];
        const percentage = successValue / stats.count;
        return (
            <div>
                <GaugeChart id="gauge-chart6" colors={["#FF5F6D", "#FFC371"]} nrOfLevels={30} percent={percentage} />
                <b className='title'>{state.workflow}</b>
                <p><b>Average Runtime: </b>{Math.floor(stats.duration / stats.count)} sec</p>
            </div>
        )
    }

    return (
        <>
            <div className='stats'>
                <h4>Success Rate</h4>
                {setWorkflowStatstics()}
            </div>
        </>
    )
}

export default Statistics;
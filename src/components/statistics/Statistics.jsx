/* eslint-disable array-callback-return */
import './Statistics.css';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext.js';
import noDataImage from '../../images/no-data.png';
import workflow from '../../workflowRuns.json';

function Statistics() {

    const { state } = useContext(AppContext);

    const getWorkflowStatstics = () => {
        let stats = {
            duration: 0,
            conclusion: {
                success: 0,
                failure: 0,
                skipped: 0,
                action_required: 0
            }
        }

        workflow.list.map(data => {
            if (state.workflow && state.workflow === data.name) {
                const createdAtTime = Date.parse(data.created_at);
                const updatedAtTime = Date.parse(data.updated_at);
                const duration = Math.floor(((updatedAtTime - createdAtTime) / 1000) % 60);
                stats.duration += duration;
                stats.conclusion[data.conclusion] += 1;
            }
        })
        console.log(stats)
    }
    getWorkflowStatstics();

    const setWorkflowStatstics = () => {
        console.log(state.workflow)
        if (!state.workflow) {
            return (
                <div className='no-data'>
                    <img src={noDataImage} alt='no-data' />
                </div>
            )
        }
        else {
            return (
                <div className=''>
                    {state.workflow}
                </div>
            )
        }
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
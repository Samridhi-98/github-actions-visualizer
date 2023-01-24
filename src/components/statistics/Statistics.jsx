import './Statistics.css';
import { useContext } from 'react';
import PieGraph from '../graph/PieGraph';
import { AppContext } from '../../context/AppContext.js';
import workflow from '../../workflowRuns.json';

function Statistics() {

    const { state } = useContext(AppContext);
    const repo = state.repoList.slice(-1)[0];

    const renderSpecificRepositoryStats = () => {

        const workflowList = workflow.list.filter(data => data.repository_name === repo);

        let data = [];

        for (const run of workflowList) {

            const createdAtTime = Date.parse(run.created_at);
            const updatedAtTime = Date.parse(run.updated_at);
            const duration = Math.floor(((updatedAtTime - createdAtTime) / 1000) % 60);

            let maxDurationRun = {
                'name': run.name,
                'duration': duration
            }

            data.push(maxDurationRun);
        }
        return data.reduce((data1, data2) => data1.duration > data2.duration ? data1 : data2);
    }

    renderSpecificRepositoryStats();

    return (
        <>
            <div className='stats'>
                <h4>Statistics</h4>
                <div className='pie-graph'>
                    <PieGraph />
                </div>
            </div>
        </>
    )
}

export default Statistics;
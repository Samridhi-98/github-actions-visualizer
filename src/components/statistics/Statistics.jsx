import './Statistics.css';
import PieGraph from '../graph/PieGraph';

function Statistics() {

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
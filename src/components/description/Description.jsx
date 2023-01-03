import { useContext } from 'react';
import { AppContext } from '../../context/AppContext.js';
import './Description.css';

function Description() {
    const { state } = useContext(AppContext);

    const renderRepoList = () => {
        // console.log("inside description: ", state)
        const card = state.repoList.map((repository, index) => {
            return (
                <div className='card' key={index}> {repository} </div>
            )
        })
        return card;
    }

    return (
        <>
            <div className='description'>
                <h4>Repositories</h4>
                {renderRepoList()}
            </div>
        </>
    )
}

export default Description;
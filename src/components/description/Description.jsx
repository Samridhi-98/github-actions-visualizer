import repository from '../../repository.json';

import './Description.css';

function Description() {

    const renderRepoList = () => {

        const card = repository.list.map((repository, index) => {
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
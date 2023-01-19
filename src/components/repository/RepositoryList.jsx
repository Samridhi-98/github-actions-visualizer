import repository from '../../repository.json';

import './RepositoryList.css';

function RepositoryList() {

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
            <div className='repository'>
                <h4>Repositories</h4>
                {renderRepoList()}
            </div>
        </>
    )
}

export default RepositoryList;
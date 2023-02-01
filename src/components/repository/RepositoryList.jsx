import { useState, useContext } from 'react';
import repository from '../../repository.json';
import { AppContext } from '../../context/AppContext.js';

import './RepositoryList.css';

function RepositoryList() {

    const [name, setName] = useState(repository.list.map(name => ('✓ ' + name)));
    const { setRepository } = useContext(AppContext);


    const updateTitle = (repoName) => {
        const newTitle = repoName.includes('✓ ') ? repoName.replace('✓ ', '') : ('✓ ' + repoName);
        const newList = [...name];
        const index = newList.indexOf(repoName);
        newList[index] = newTitle;
        setName(newList);
        setRepository(newList);
    }

    const renderRepoList = () => {
        const card = name.map((title, index) => {
            return <div className='card' key={index} onClick={() => { updateTitle(title) }}>{title}</div>
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
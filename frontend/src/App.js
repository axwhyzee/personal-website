import { useState, useEffect } from 'react';

import Card from './components/card/Card.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';
import Spinner from './components/spinner/Spinner.jsx';

import { list_user_repos } from './utils/github_api.js';
import { Githubsearch } from './githubsearch/Githubsearch.jsx';
import './app.css'

function App() {
    const [repos, setRepos] = useState([]);
    const [pinned, setPinned] = useState([]);
    const [username, setUsername] = useState('axwhyzee');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const list_repos = async () => {
            const fetched_repos = await list_user_repos(username);
            const not_pinned = [];
            const is_pinned = [];
            for (const repo of fetched_repos) {
                if (repo.pinned) is_pinned.push(repo);
                else not_pinned.push(repo);
            }
            setRepos(not_pinned);
            setPinned(is_pinned);
            setLoading(false);
        }
        setLoading(true);
        list_repos();
    }, [username])

    const setUsernameCallback = (s) => {
        if (s !== username) {
            setRepos([]);
            setPinned([]);
            setUsername(s);
        }
    }

    return (
        <div className='App'>
            <div className='main-view'>
                <div className='box-shadow'>
                    <Githubsearch setUsername={setUsernameCallback} />
                </div>
                <div className='spacer' />
                <div className='cards bg-light box-shadow'>
                    <h1 className='header title'>Hello @{username} !</h1>
                    {loading && <Spinner msg='Fetching GitHub API data'/>}
                    {pinned.length > 0 && (
                        <>                        
                        <h2 className='header'>Pinned</h2>
                        {pinned.map((repo, i) => <Card key={'pinned'+i} repo={repo}/>)}
                        </>
                    )}
                </div>
                <div className='spacer' />
                <div className='cards bg-dark box-shadow'>
                    {repos.length > 0 ? repos.map((repo, i) => <Card key={i} repo={repo}/>) : <h4 className='header'>No repositories found</h4>}
                </div>
            </div>
            <Sidebar />
        </div>
    );
}

export default App;

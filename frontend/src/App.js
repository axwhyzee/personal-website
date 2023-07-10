import { useState, useEffect } from 'react';

import Card from './components/card/Card.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';
import Spinner from './components/spinner/Spinner.jsx';

import { list_user_repos } from './utils/github_api.js';
import Githubsearch from './components/githubsearch/Githubsearch.jsx';
import './app.css'

function App() {
    const [repos, setRepos] = useState([]);
    const [pinned, setPinned] = useState([]);
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const list_repos = async (newUsername, token='') => {
        setLoading(true);
        setUsername(newUsername)

        const res = await list_user_repos(newUsername, token);

        if (res.error) {
            setError(res.error);
        } else {
            const not_pinned = [];
            const is_pinned = [];
            for (const repo of res.repos) {
                if (repo.pinned) is_pinned.push(repo);
                else not_pinned.push(repo);
            }
            setRepos(not_pinned);
            setPinned(is_pinned);
        }
        setLoading(false);
    }

    useEffect(() => {
        list_repos('axwhyzee');
    }, [])

    const setUsernameTokenCallback = (s) => {
        console.log(s);
        const parts = s.split(';');
        console.log(parts);
        if (parts[0]) {
            setRepos([]);
            setPinned([]);
            list_repos(parts[0], parts[1]);
        }
    }

    return (
        <div className='App'>
            <div className='main-view'>
                <div className='box-shadow'>
                    <Githubsearch callback={setUsernameTokenCallback} />
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
                    {error && <span className='error'>{error}</span>}
                </div>
            </div>
            <Sidebar />
        </div>
    );
}

export default App;

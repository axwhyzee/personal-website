import { useEffect, useState } from 'react';
import Card from '../card/Card.jsx';
import Githubsearch from '../githubsearch/Githubsearch.jsx';
import Spinner from '../spinner/Spinner.jsx';

import { list_user_repos } from '../../utils/github_api.js';
import { ITEMS_PER_PAGE } from '../../consts/consts.js';
import './repos.css';

function Repos() {
    const [repos, setRepos] = useState([]);
    const [pinned, setPinned] = useState([]);
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [pages, setPages] = useState([]);
    const [page, setPage] = useState()

    const initPages = (n)  => {
        if (n==0) return
        const _pages = [];
        let _page;
        let i;
        for (i=0; i<n-ITEMS_PER_PAGE; i+=ITEMS_PER_PAGE) {
            _page = [];
            for (let j=0; j<ITEMS_PER_PAGE; j++) _page.push(i+j);
            _pages.push(_page);
        }
        if (n % ITEMS_PER_PAGE) {
            _page = [];
            for (let j=i; j<n; j++) _page.push(j);
            _pages.push(_page);
        }
        setPages(_pages);
        setPage(0);
    }

    const list_repos = async (newUsername, token='') => {
        setLoading(true);
        setUsername(newUsername)

        const res = await list_user_repos(newUsername, token);

        if (res.error) setError(res.error);
        else {
            const not_pinned = [];
            const is_pinned = [];
            const repos = res.repos;
            for (const repo of repos) {
                if (repo.pinned) is_pinned.push(repo);
                else not_pinned.push(repo);
            }
            initPages(not_pinned.length);
            setRepos(not_pinned);
            setPinned(is_pinned);
            console.log(not_pinned);
        }
        setLoading(false);
    }

    useEffect(() => {
        list_repos('axwhyzee');
    }, [])

    const setUsernameTokenCallback = (s) => {
        const parts = s.split(';');
        if (parts[0]) {
            setRepos([]);
            setPinned([]);
            list_repos(parts[0], parts[1]);
        }
    }

    return (
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
                <h2 className='header'>Repositories</h2>
                {
                    page != null ? (
                        pages[page].map((i) => <Card key={'repo'+i} repo={repos[i]}/>)
                    ) : (
                        <h4 className='header'>No repositories found</h4>
                    )
                }
                {error && <span className='error'>{error}</span>}
                <div className='pagination-wrapper'>
                    {pages.map((pg, i) => <button className={'pg-btn ' + (i == page ? 'pg-active' : '')} onClick={() => setPage(i)}>{i+1}</button>)}
                </div>
            </div>
        </div>
    )
}

export default Repos;
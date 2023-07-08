import { useRef } from "react";

import './githubsearch.css';

export function Githubsearch({setUsername}) { 
    const inputRef = useRef();

    return (
        <section className='bg-dark padding-hor'>
            <label>GitHub Username</label>
            <div className='github-input-wrapper space-below'>                
                <input type='text' placeholder='axwhyzee' ref={inputRef} className='github-input'/>
                <button onClick={()=>setUsername(inputRef.current?.value)} className='btn-github'>SEARCH</button>
            </div>
            <div className='token-input-wrapper'>
                <label>GitHub Personal Access Token (Optional)</label>
                <input type='text' placeholder='E.g., ghp_26ZlUDd0We93IsCN5H7Ibv59dHLisN0UOyE4' className='token-input'/>
                <div className='token-help'>
                    Provide your access token to view all repos accessible to you, including private ones owned by others.
                    <br /><br />
                    Go to <a target='_blank' href='https://github.com/settings/tokens' rel="noreferrer">https://github.com/settings/tokens</a>, <code>Generate new token</code> &#x3e; <code>Generate new token (classic)</code>
                    <br/>
                    Under <code>Select scopes</code>, check the <code>repo</code> option.
                </div>
            </div>
        </section>
    )
}
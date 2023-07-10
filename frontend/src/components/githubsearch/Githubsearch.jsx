import React, { forwardRef, useRef } from "react";
import { Input, RefInput } from '../input/Input.jsx'; 

import './githubsearch.css';

function Githubsearch({callback}) { 
    const tokenRef = useRef();

    const subCallback = (val) => {
        console.log(tokenRef.current.value);
        callback(val + ';' + tokenRef.current.value);
    }

    return (
        <section className='bg-dark padding-hor'>
            <Input 
                label='GitHub Username' 
                placeholder='axwhyzee' 
                btn={{label: 'SEARCH', callback: subCallback}}
            />
            <div className='token-input-wrapper'>
                <RefInput 
                    label='GitHub Personal Access Token (Optional)' 
                    placeholder='E.g., ghp_26ZlUDd0We93IsCN5H7Ibv59dHLisN0UOyE4'
                    ref={tokenRef}
                />
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

export default Githubsearch;
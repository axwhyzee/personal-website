import { useEffect, useState } from "react";
import { get_user_stats } from "../../utils/leetcode_api";

import './leetcode.css';

function Leetcode() {
    const [solved, setSolved] = useState({easy: 0, medium: 0, hard: 0});
    useEffect(() => {
        const fetchSolved = async () => {
            const data = await get_user_stats('alessio_cohen');
            setSolved({
                easy: data.easySolved,
                medium: data.mediumSolved,
                hard: data.hardSolved
            });
            console.log(data)
        };
        fetchSolved();
    }, [])
    
    return (
        <>
        <h2 className='header'>Leetcode</h2>
        <br />
        <div className='lc-wrapper'>
            <div className='lc lc-easy'>
                <span>{solved.easy}</span>
                <span>Easy</span>
            </div>
            <div className='lc lc-med'>
                <span>{solved.medium}</span>
                <span>Medium</span>
            </div>
            <div className='lc lc-hard'>
                <span>{solved.hard}</span>
                <span>Hard</span>
            </div>
        </div>
        </>
    )
}

export default Leetcode;
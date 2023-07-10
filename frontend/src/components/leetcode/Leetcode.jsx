import { useEffect, useState, useRef } from "react";
import { get_user_stats } from "../../utils/leetcode_api";
import Spinner from '../spinner/Spinner.jsx';
import { Input } from '../input/Input.jsx';
import './leetcode.css';

const lc_icon_left = require('../../assets/leetcode_logo_left.png');
const lc_icon_right = require('../../assets/leetcode_logo_right.png');

const dummySolved = {
    "totalSolved":0,
    "totalQuestions":3,
    "easySolved":0,
    "totalEasy":1,
    "mediumSolved":0,
    "totalMedium":1,
    "hardSolved":0,
    "totalHard":1
}
function Leetcode() {
    // as of 09/07/23 21:21
    const [solved, setSolved] = useState(dummySolved);
    const inputRef = useRef();

    const fetchSolved = async (username) => {
        if (!username) return;

        setLoading('Searching for ' + username + ' ...');
        const data = await get_user_stats(username);

        if (data.status === 'success') setSolved(data);
        else setSolved(dummySolved)

        setLoading('');
    };
    const [loading, setLoading] = useState('');

    useEffect(() => {
        fetchSolved('alessio_cohen')
    }, [])
    
    return (
        <>
        <div className='lc-icon'>
            <img src={lc_icon_left} className='lc-icon-left' />
            <img src={lc_icon_right} className='lc-icon-right' />
        </div>
        <Input 
            label='Leetcode Username'
            placeholder='alessio_cohen'
            btn={{label: 'SEARCH', callback: fetchSolved}}            
        />
        {loading && <Spinner msg={loading} />}
        <div className='lc-wrapper'>
            <section className='lc-total' style={{"--p":100*solved.totalSolved/solved.totalQuestions+'%'}}>
                <span className='lc-total-num text-white'>{solved.totalSolved}</span>
                <span className='text-muted text-sm'>Solved</span>
            </section>
            <table className='lc-bars'>
                <tbody>
                    <tr>
                        <td className='text-muted text-sm'>Easy</td>
                        <td className='text-white text-md indiv-solved bold'>{solved.easySolved}</td>
                        <td className='text-muted text-sm'>/{solved.totalEasy}</td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <div className='progress-outer green'>
                                <div className='progress-inner green' style={{'--p': 100*solved.easySolved/solved.totalEasy+'%'}} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='text-muted text-sm'>Medium</td>
                        <td className='text-white text-md indiv-solved bold'>{solved.mediumSolved}</td>
                        <td className='text-muted text-sm'>/{solved.totalMedium}</td>
                        
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <div className='progress-outer yellow'>
                                <div className='progress-inner yellow' style={{'--p': 100*solved.mediumSolved/solved.totalMedium+'%'}} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='text-muted text-sm'>Hard</td>
                        <td className='text-white text-md indiv-solved bold'>{solved.hardSolved}</td>
                        <td className='text-muted text-sm'>/{solved.totalHard}</td>
                        
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <div className='progress-outer red'>
                                <div className='progress-inner red' style={{'--p': 100*solved.hardSolved/solved.totalHard+'%'}} />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </>
    )
}

export default Leetcode;
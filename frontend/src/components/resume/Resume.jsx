import { useRef, useState } from 'react';
import { upload_file, get_inference, get_server_file_path } from '../../utils/server_api';
import Spinner from '../spinner/Spinner.jsx'; 
import { RESUME_FILEPATH, RESUME_FILENAME } from '../../consts/consts';

import './resume.css';

function Resume() {
    const chatRef = useRef();
    const [resume, setResume] = useState({'name': RESUME_FILENAME, 'url': RESUME_FILEPATH});
    const [loading, setLoading] = useState(false);

    const handleUpload = async (e) => {
        const formData = new FormData();
        const fileObj = e.target.files[0];

        if (!fileObj) return

        setLoading('Uploading file ...');
        e.preventDefault();
        
        // 2 MB
        if (fileObj.size > 2097152) {
            alert('File is too big.'); 
            setLoading('');
            return;
        }
        formData.append('file', fileObj);
        const filepath = await upload_file(formData);
        setResume({'name': fileObj.name, 'url':get_server_file_path(filepath)})
        setLoading('Parsing file ...');
        chatRef.current.innerText = await get_inference(filepath)
        setLoading('');
    }
    
    return (
        <>
            <h2 className='text-white'>Resume</h2>
            <p className='text-light space-below'>Upload your resume to get a summary by Google Bard</p>
            <div className='align-center'>
                <div className='file-upload-wrapper space-below'>
                    <label htmlFor="file-upload" className='file-upload-label'>
                        <i className="fa-solid fa-cloud-arrow-up cloud-icon fa-2xl" /><br />
                        Click to Upload Resume<br />
                        <span className='sub-text'>(Single page, max 2 MB)</span><br />
                        <code>.docx</code> <code>.pdf</code> <code>.txt</code>
                    </label>
                    <br />
                    <a className='text-light' href={resume.url} target='_blank' rel='noreferrer'>
                        <i className="fa-solid fa-link" />&nbsp;{resume.name}
                    </a>
                </div>
            </div>
            <input id='file-upload' type='file' name='file' onChange={handleUpload} accept='"application/msword, text/plain, application/pdf' />
            {loading && <Spinner msg={loading} />}
            {loading !== false && (
                <>
                <div className='chat bg-light'>
                    <h4 className='text-white space-below'>Google Bard says:</h4>
                    <div ref={chatRef}></div>
                </div>
                </>
            )}
            
        </>
    )
}

export default Resume;
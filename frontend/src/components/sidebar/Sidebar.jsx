import Resume from '../resume/Resume.jsx';
import Leetcode from '../leetcode/Leetcode.jsx';

import './sidebar.css';

function Sidebar() {
    return (
        <div className="Sidebar">
            <section className='bg-light social-icon-wrapper sidebar-section'>            
                <a className='social-icon' href='mailto:siah_weehung@yahoo.com' title='siah_weehung@yahoo.com' rel="noreferrer">
                    <i className="fa-solid fa-envelope" />
                </a>
                <a className='social-icon' href='https://www.linkedin.com/in/wee-hung-siah-58b970146/' title='LinkedIn' target='_blank' rel="noreferrer">
                    <i className="fa-brands fa-linkedin-in" />
                </a>
                <a className='social-icon' href='https://github.com/axwhyzee/' title='GitHub' target='_blank' rel="noreferrer">
                    <i className="fa-brands fa-github" />
                </a>
            </section>
            <section className='bg-dark sidebar-section'>
                <Resume />
            </section>
            <section className='bg-light sidebar-section'>
                <Leetcode />
            </section>
        </div>
    );
}
  
export default Sidebar;
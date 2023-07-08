import Tag from '../tag/Tag';
import './card.css';

import { COLOR_CYAN, COLOR_RED, COLOR_LIME } from '../../consts/consts';

function Card({repo}) {
    return (
        <div className={'Card ' + (repo.pinned && 'pinned')}>
            <a href={repo.url} target='_blank' rel="noreferrer">
                <span className='header'>{repo.name}</span>
            </a>
            <div className='tags-wrapper'>
                {repo.visibility === 'PUBLIC' ? (
                    <Tag color={COLOR_LIME} text={repo.visibility}/>
                ) : (
                    <Tag color={COLOR_RED} text={repo.visibility}/>
                )}
                {repo.pinned && <i className="pin fa-solid fa-thumbtack" />}
            </div>
            <div className='preview-wrapper'>
                <img className='preview' src={repo.openGraphImageUrl} alt={repo.openGraphImageUrl}/>
            </div>
            
            <span className='body'>{repo.description}</span>
            
            <div className='tags-wrapper'>
                {repo.repositoryTopics.nodes.map((node, i) => <Tag color={COLOR_CYAN} text={node.topic.name} key={i + repo.url}/>)}
            </div>
            {repo.homepageUrl && <a className='demo-btn' href={repo.homepageUrl} target='_blank' rel="noreferrer">VIEW DEMO</a>}
        </div>
    );
}
  
export default Card;
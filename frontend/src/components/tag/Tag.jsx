import './tag.css';

function Tag({text, color}) {
    return (
        <div className="Tag" style={{backgroundColor: color}}>
            <span>{text}</span>
        </div>
    );
}
  
export default Tag;
import './KudosBoard.css';
import { Link } from 'react-router-dom';


const KudosBoard = ({ id, title, author,  category, imgUrl, onDelete }) => {
  return (
    <div className="kudos-board">
      <img src={imgUrl}  alt="kudos" />
      <h3>{title}</h3>
      <p>{category}</p>
      <p>{author}</p>
      <button className = "view-button">
        <Link to={`/kudos-board/${id}`}>View Board</Link>
      </button>
      <button className = "delete-button" onClick={() => onDelete(id)}>Delete Board</button>
    </div>
  );
};

export default KudosBoard;


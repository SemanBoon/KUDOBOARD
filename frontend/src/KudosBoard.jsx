
import React from 'react';
import './KudosBoard.css';

const KudosBoard = ({ id, title,  category, imgUrl, onView, onDelete }) => {
  return (
    <div className="kudos-board">
      <img src={imgUrl}  alt="kudos" />
      <h3>{title}</h3>
      <p>{category}</p>
      <button onClick={() => onView(id)}>View Board </button>
      <button onClick={() => onDelete(id)}>Delete Board</button>
    </div>
  );
};

export default KudosBoard;

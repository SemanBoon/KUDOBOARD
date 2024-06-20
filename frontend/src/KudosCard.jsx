import React from 'react';
import './KudosCard.css';

const KudosCard = ({ card, onDelete, onUpvote }) => {
  return (
    <div className="kudos-card">
      <h3>{card.title}</h3>
      <p>{card.description}</p>
      <img src={card.gifUrl} alt="gif" />
      <p>Owner: {card.owner}</p>
      <button onClick={() => onUpvote(card.id)}>Upvote ({card.upvote})</button>
      <button onClick={() => onDelete(card.id)}>Delete</button>
    </div>
  );
};

export default KudosCard;

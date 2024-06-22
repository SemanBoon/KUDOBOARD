import React from 'react';

const KudosCard = ({ card, onDelete, onUpvote }) => {
  console.log(card);
  return (
    <div className="kudos-card">
      <h3>{card.title}</h3>
      <p>{card.description}</p>
      <img src={card.gifUrl} alt="gif" />
      <p>{card.owner}</p>
      <button className="upvote-button" onClick={() => onUpvote(card.id)}>Upvote: {card.upvote}</button>
      <button className="delete-button" onClick={() => onDelete(card.id)}>Delete</button>
    </div>
  );
};

export default KudosCard;

// Created CardDetail to handle the display and creation of cards for a specific board.
import React, { useEffect, useState } from 'react';
import KudosCard from './KudosCard';
import CreateCardModal from './CreateCardModal';

const CardDetail = ({ match }) => {
  const { id } = match.params; // Assuming you're using React Router for navigation
  const [board, setBoard] = useState(null);
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBoardDetails();
    fetchBoardCards();
  }, []);

  const fetchBoardDetails = () => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudos-board/${id}`)
      .then(response => response.json())
      .then(data => setBoard(data))
      .catch(error => console.error('Error fetching board details:', error));
  };

  const fetchBoardCards = () => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudos-cards?boardId=${id}`)
      .then(response => response.json())
      .then(data => setCards(data))
      .catch(error => console.error('Error fetching board cards:', error));
  };

  const createCard = (title, description, gifUrl, owner) => {
    return fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudos-cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, gifUrl, owner, KBid: id })
    })
      .then(response => response.json())
      .then(newCard => setCards([...cards, newCard]))
      .catch(error => console.error('Error creating card:', error));
  };

  const deleteCard = (cardId) => {
    return fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudos-cards/${cardId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setCards(cards.filter(card => card.id !== cardId));
      })
      .catch(error => console.error('Error deleting card:', error));
  };

  const upvoteCard = (cardId) => {
    // Logic for upvoting the card (usually a PUT request to update the upvote count)
  };

  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <div className="kudos-board-detail">
      <h2>{board.title}</h2>
      <button onClick={() => setShowModal(true)}>Create a New Card</button>
      <div className="kudos-cards">
        {cards.map(card => (
          <KudosCard
            key={card.id}
            card={card}
            onDelete={deleteCard}
            onUpvote={upvoteCard}
          />
        ))}
      </div>
      {showModal && <CreateCardModal
        showModal={showModal}
        setShowModal={setShowModal}
        createCard={createCard}
      />}
    </div>
  );
};

export default CardDetail;

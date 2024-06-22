import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import KudosCard from './KudosCard';
import CreateCardModal from './CreateCardModal';
import './CardDetails.css';

const CardDetails = ({ }) => {
    const { id } = useParams();
    const [board, setBoard] = useState(null);
    const [cards, setCards] = useState([]);
    const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBoardDetails();
    fetchBoardCards();
  }, [id]);

  const fetchBoardDetails = () => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudos-board/${id}`)
      .then(response => response.json())
      .then(data => setBoard(data))
      .catch(error => console.error('Error fetching board details:', error));
  };

  const fetchBoardCards = () => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudos-cards/${id}`)
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
      .then(newCard => {
        setCards([...cards, newCard]);
        fetchBoardCards();
      })

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
    return fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudos-cards/${cardId}`, {
      method: 'PUT',
    })
      .then(response => response.json())
      .then(updatedCard => {
        setCards(cards.map(card => card.id === cardId ? updatedCard : card));
      })
      .catch(error => console.error('Error upvoting card:', error));
  };


  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <div className="kudos-board-detail">
      <h2 className='board-title'>{board.title}</h2>
      <button className="create-card" onClick={() => setShowModal(true)}>Create a New Card</button>
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

export default CardDetails;

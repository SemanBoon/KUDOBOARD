import React, { useState } from 'react';
import './CreateCardModal.css';

const CreateCardModal = ({ showModal, setShowModal, createCard }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [gifUrl, setGifUrl] = useState('');
  const [owner, setOwner] = useState('');
  const [gifs, setGifs] = useState([]);

  const handleSearch = () => {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=JSmubn7fVHndB0uIqHiKLW5k8ng7hKV0&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`)
      .then(response => response.json())
      .then(data => setGifs(data.data))
      .catch(error => console.error('Error fetching GIFs:', error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title && description && gifUrl && owner) {
      createCard(title, description, gifUrl, owner)
        .then(() => {
          setTitle('');
          setDescription('');
          setGifUrl('');
          setOwner('');
          setShowModal(false);
        });
    }
  };

  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <form onSubmit={handleSubmit}>
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />

              <label htmlFor="description">Description:</label>
              <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />

              <label htmlFor="searchTerm">Search GIF:</label>
              <input type="text" id="searchTerm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <button type="button" onClick={handleSearch}>Search</button>

              <div className="gif-results">
                {gifs.map(gif => (
                  <img
                    key={gif.id}
                    src={gif.images.fixed_height.url}
                    alt={gif.title}
                    onClick={() => setGifUrl(gif.images.fixed_height.url)}
                    className={gifUrl === gif.images.fixed_height.url ? 'selected' : ''}
                  />
                ))}
              </div>

              <label htmlFor="owner">Owner:</label>
              <input type="text" id="owner" value={owner} onChange={(e) => setOwner(e.target.value)} required />

              <button type="submit">Create Card</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateCardModal;

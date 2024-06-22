import React, { useState } from 'react';
import './CreateCardModal.css';

const CreateCardModal = ({ showModal, setShowModal, createCard }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [gifUrl, setGifUrl] = useState('');
  const [owner, setOwner] = useState('');
  const [gifs, setGifs] = useState([]);
  const [copyButtonText, setCopyButtonText] = useState('Copy GIF URL');

  const handleSearch = () => {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=JSmubn7fVHndB0uIqHiKLW5k8ng7hKV0&q=${searchTerm}&limit=10&offset=0&rating=g&lang=en&bundle=messaging_non_clips`)
      .then(response => response.json())
      .then(data => setGifs(data.data))
      .catch(error => console.error('Error fetching GIFs:', error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title && description && gifUrl) {
      createCard(title, description, gifUrl, owner)
        .then(() => {
          setTitle('');
          setDescription('');
          setGifUrl('');
          setOwner('');
          setShowModal(false);
        });
    }
    console.log(title, description, gifUrl);
  };

  const handleGifClick = (e) => {
    setGifUrl(e.target.src);
  }

  const handleCopyGifUrl = () => {
    navigator.clipboard.writeText(gifUrl).then(() => {
      setCopyButtonText('URL Copied');
      setTimeout(() => setCopyButtonText('Copy GIF URL'), 2000);
    });
  };

  return (
    <>
      {showModal && (
        <div className="card-modal">
          <div className="card-modal-content">
            <span className="card-close" onClick={() => setShowModal(false)}>&times;</span>
            <form className ="card-board-info"onSubmit={handleSubmit}>
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />

              <label htmlFor="description">Message:</label>
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
                    onClick={(e)=> handleGifClick(e)}
                    className={gifUrl === gif.images.fixed_height.url ? 'selected' : ''}
                  />
                ))}
              </div>

              <label htmlFor="selectedGifUrl"></label>
              <input type="text" id="selectedGifUrl" value={gifUrl} readOnly />
              <button type="button" onClick={handleCopyGifUrl}>{copyButtonText}</button>

              <label htmlFor="owner">Owner:</label>
              <input type="text" id="owner" placeholder="Enter Owner (Optional)" value={owner} onChange={(e)  => setOwner(e.target.value)} />

              <input className ="submit-button"type="submit" value="Create Card" />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateCardModal;

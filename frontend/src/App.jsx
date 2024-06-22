import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';
import Dashboard from './Dashboard';
import KudosBoard from './KudosBoard';
import CreateBoardModal from './CreateBoardModal';
import CardDetails from './CardDetails';
import './App.css';

const Header = () => {
  const location = useLocation();
  return (
    <>
    <header className="app-header">
      {location.pathname.includes('/kudos-board/') && (
        <a href="/" className="back-button">
          <span className='back-arrow'> ˱ </span>
        </a>
        )}
      <h1>KUDOBOARD</h1>
    </header>
    </>
  );
};

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>{`\u00A9 Made by Chi♡`}</p>
    </footer>
  );
};

const Home = ({ setShowModal, kudosBoards, deleteKudosBoard, setFilteredBoards, searchTerm, setSearchTerm }) => {
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBoards = kudosBoards.filter(board =>
    board.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      <Dashboard setShowModal={setShowModal} setFilteredBoards={setFilteredBoards} />
      <div className="kudos-container">
        {filteredBoards.map(board => (
          <KudosBoard
            key={board.id}
            id={board.id}
            title={board.title}
            category={board.category}
            author={board.author}
            imgUrl={board.imgUrl}
            onDelete={deleteKudosBoard}
          />
        ))}
      </div>
    </>
  );
};


const App = () => {
  const [kudosBoards, setKudosBoards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchKudosBoards = () => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudos-board`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      setKudosBoards(data);
    })
    .catch(error => {
      console.error('Error fetching kudos boards:', error);
    });
  };

  const createKudosBoard = (title, category, author) => {
    const randomPhoto = `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`;
    return fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudos-board`,
 {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, category, author, imgUrl: randomPhoto,})
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(newBoard => {
      setKudosBoards([...kudosBoards, newBoard]);
    })

    .catch(error => {
      console.error('Error creating kudos board:', error);
  });
};

  useEffect (() => {
    fetchKudosBoards()
  }, []);

  const viewKudosBoard = (id) => {
    history.push(`/kudos-board/${id}`);
  };

  const deleteKudosBoard = (id) => {
    return fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudos-board/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setKudosBoards(kudosBoards.filter(board => board.id !== id));
      })
      .catch(error => {
        console.error('Error deleting kudos board:', error);
      });
  };

  const setFilteredBoards = (filteredBoards) => {
    setKudosBoards(filteredBoards);
  }

  return (
    <Router>
      <div className="app">
        <Header/>
        <Routes>
          <Route path="/" element={
            <Home
              setShowModal={setShowModal}
              kudosBoards={kudosBoards}
              deleteKudosBoard={deleteKudosBoard}
              setFilteredBoards={setFilteredBoards}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          } />
          <Route path="/kudos-board/:id" element={<CardDetails/>} />
          </Routes>
          <CreateBoardModal
            showModal={showModal}
            setShowModal={setShowModal}
            createKudosBoard={createKudosBoard}
          />
        <Footer />
      </div>
    </Router>
  );
};
export default App;

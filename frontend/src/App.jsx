import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SearchBar from './SearchBar';
import Dashboard from './Dashboard';
import KudosBoard from './KudosBoard';
import CreateBoardModal from './CreateBoardModal';
import CardDetails from './CardDetails';
import './App.css';

const Header = () => {
  return (
    <header className="app-header">
      <h1>KUDOBOARD</h1>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>{`\u00A9 Made by Chi♡`}</p>
    </footer>
  );
};


const App = () => {
  const [kudosBoards, setKudosBoards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // const history = useHistory();

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
    return fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudos-board`, {
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

  return (
    <Router>
      <div className="app">
        <Header />
        <SearchBar />
          <Route path="/" exact>
            <Dashboard setShowModal={setShowModal} />
            <div className="kudos-container">
              {kudosBoards.map(board => (
                <KudosBoard
                  key={board.id}
                  id={board.id}
                  title={board.title}
                  category={board.category}
                  imgUrl={board.imgUrl}
                  onDelete={deleteKudosBoard}
                  onView={viewKudosBoard}
                />
              ))}
            </div>
            <CreateBoardModal
              showModal={showModal}
              setShowModal={setShowModal}
              createKudosBoard={createKudosBoard}
            />
          </Route>
          <Route path="/kudos-board/:id" component={CardDetails} />
        <Footer />
      </div>
    </Router>
  );
};
export default App;

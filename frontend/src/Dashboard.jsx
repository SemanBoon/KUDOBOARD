import React, { useEffect, useState } from 'react';

const Dashboard = ({setShowModal, setFilteredBoards}) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const handleFilter = (filterType) => {
    setActiveFilter(filterType);
  }

  let query = '';
    if (activeFilter === 'Recent') {
      query = '?sort=recent';
    } else if (activeFilter !== 'All') {
      query = `?filter=${activeFilter}`;
    }

    const fetchFilteredBoards = (query)  => {
      fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudos-board${query}`)
      .then(response => response.json())
      .then(data => setFilteredBoards(data))
      .catch(error => console.error('Error fetching filtered boards:', error));
    };

    useEffect (() => {
      fetchFilteredBoards(query);
    }, [query]);

  return (
    <>
      <div className="dashboard">
        <div className="filter-buttons">
          <button onClick={() => handleFilter('All')} className={activeFilter === 'All' ? 'active' : ''}>All</button>
          <button onClick={() => handleFilter('Recent')} className={activeFilter === 'Recent' ? 'active' : ''}>Recent</button>
          <button onClick={() => handleFilter('Celebration')} className={activeFilter === 'Celebration' ? 'active' : ''}>Celebration</button>
          <button onClick={() => handleFilter('Thank You')} className={activeFilter === 'Thank You' ? 'active' : ''}>Thank You</button>
          <button onClick={() => handleFilter('Inspiration')} className={activeFilter === 'Inspiration' ? 'active' : ''}>Inspiration</button>
        </div>
        <div className="create-board">
          <button onClick={() => setShowModal(true)}>Create a New Board</button>
        </div>
      </div>
    </>
  );
};
export default Dashboard;

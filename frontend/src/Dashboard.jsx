import React, { useState } from 'react';

const Dashboard = ({setShowModal}) => {
  return (
    <>
      <div className="dashboard">
        <div className="filter-buttons">
          <button>All</button>
          <button>Recent</button>
          <button>Celebration</button>
          <button>Thank You</button>
          <button>Inspiration</button>
        </div>
        <div className="create-board">
          <button onClick={() => setShowModal(true)}>Create a New Board</button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

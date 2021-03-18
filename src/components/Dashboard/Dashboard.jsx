import React from 'react';

const Dashboard = ({ setCurrentClickFunction }) => {
  const handleStartButtonClick = () => {
    setCurrentClickFunction('setStartNode');
  };
  const handleEndButtonClick = () => {
    setCurrentClickFunction('setEndNode');
  };
  return (
    <div>
      <h1>This is the dashboard</h1>
      <button type="button" onClick={handleStartButtonClick}>
        Select Start
      </button>
      <button type="button" onClick={handleEndButtonClick}>
        Select End
      </button>
      <button type="button">Find Path!</button>
    </div>
  );
};

export default Dashboard;

import React from 'react';
import GameBoard from './components/GameBoard'; // Import your main game component

const App: React.FC = () => {
  return (
      <div className="App">
        <h1>Pip Pip Panic</h1> {/* Optional title */}
        <GameBoard />           {/* Render your game board */}
      </div>
  );
};

export default App;

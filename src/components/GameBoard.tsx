import React from 'react';
import { useGameState } from '../hooks/useGameState';
import Timer from './Timer';
import { Direction } from '../types';
import '../styles/game-board.scss'; // Ensure the styles are imported

const GameBoard: React.FC = () => {
    // Set game parameters
    const { game, placeTile } = useGameState(5, [{ position: { x: 0, y: 0 }, pipCount: 5 }, { position: { x: 2, y: 2 }, pipCount: 3 }], { x: 4, y: 4 });

    const handleTilePlacement = (x: number, y: number, direction: Direction) => {
        placeTile(x, y, direction);  // Place a tile when clicked
    };

    const handleTimeUp = () => {
        alert('Time’s up! Game over.');
        // Additional game-over logic can be added here
    };

    return (
        <div className="game-container">
            <Timer initialTime={60} onTimeUp={handleTimeUp} />

            <div className="game-board">
                {game.board.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((tile, tileIndex) => (
                            <div
                                key={tileIndex}
                                className={`tile ${tile.type}`} // Apply tile type (like empty, arrow, etc.)
                                onClick={() => handleTilePlacement(tileIndex, rowIndex, Direction.Right)} // Change direction here
                            >
                                {/* Optionally show the direction of arrow tiles */}
                                {tile.type === 'arrow' ? tile.direction : ''}

                                {/* Render each tile */}
                                {game.pips.some(pip => pip.position.x === tileIndex && pip.position.y === rowIndex) ? '🐭' : ''}
                                {game.zogs.some(zog => zog.position.x === tileIndex && zog.position.y === rowIndex) ? '🐱' : ''}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameBoard;

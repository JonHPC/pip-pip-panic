import { useState, useEffect } from 'react';
import { Game } from '../models/Game';
import { SpawnPoint, Position } from '../types';
import { Direction } from '../types';

export const useGameState = (boardSize: number, spawnPoints: SpawnPoint[], escapePod: Position) => {
    // Initialize game state with board size, spawn points, and escape pod position
    const [game, setGame] = useState<Game>(new Game(boardSize, spawnPoints, escapePod));

    useEffect(() => {
        const interval = setInterval(() => {
            game.updateGameState(); // Update the game state
            setGame(game);          // Trigger re-render
        }, 1000);

        return () => clearInterval(interval);
    }, [game]);

    const placeTile = (x: number, y: number, direction: Direction) => {
        game.placeTile(x, y, direction);  // Place a tile
        setGame(game);                    // Trigger re-render
    };

    return { game, placeTile };
};

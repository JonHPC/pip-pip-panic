import { Direction, Position } from './types';

/**
 * Returns the opposite direction of the given direction.
 */
export const reverseDirection = (direction: Direction): Direction => {
    switch (direction) {
        case Direction.Up: return Direction.Down;
        case Direction.Down: return Direction.Up;
        case Direction.Left: return Direction.Right;
        case Direction.Right: return Direction.Left;
    }
};

/**
 * Checks if the position is within the bounds of the board.
 */
export const isWithinBounds = (position: Position, boardSize: number): boolean => {
    return position.x >= 0 && position.x < boardSize && position.y >= 0 && position.y < boardSize;
};

/**
 * Formats time in seconds into a mm:ss string format.
 */
export const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Generates a random direction from the four possible directions.
 */
export const randomDirection = (): Direction => {
    const directions = [Direction.Up, Direction.Down, Direction.Left, Direction.Right];
    return directions[Math.floor(Math.random() * directions.length)];
};

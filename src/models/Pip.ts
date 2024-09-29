import { Position, Direction } from '../types';

export class Pip {
    position: Position;
    direction: Direction;

    constructor(initialPosition: Position) {
        this.position = { ...initialPosition };
        this.direction = Direction.Right;  // Start moving right
    }

    move(boardSize: number, board: any[][]): void {
        let { x, y } = this.position;

        // Move based on the current direction
        switch (this.direction) {
            case Direction.Up: y -= 1; break;
            case Direction.Down: y += 1; break;
            case Direction.Left: x -= 1; break;
            case Direction.Right: x += 1; break;
        }

        // Check for walls
        if (x < 0 || y < 0 || x >= boardSize || y >= boardSize) {
            // If a wall is hit, reverse direction
            this.direction = this.reverseDirection();
        } else if (board[y][x].type === 'arrow') {
            // Change direction based on the placed arrow tile
            this.direction = board[y][x].direction!;
        } else {
            // Move to the new position
            this.position = { x, y };
        }
    }

    reverseDirection(): Direction {
        switch (this.direction) {
            case Direction.Up: return Direction.Down;
            case Direction.Down: return Direction.Up;
            case Direction.Left: return Direction.Right;
            case Direction.Right: return Direction.Left;
        }
    }
}

import { Position, Direction } from '../types';
import { Pip } from './Pip';

export class Zog {
    position: Position;
    direction: Direction;

    constructor(initialPosition: Position) {
        this.position = { ...initialPosition };
        this.direction = this.randomDirection();  // Start with a random direction
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

    eatPip(pips: Pip[]): Pip[] {
        // Check if the Zog is on the same tile as any Pip
        return pips.filter(pip => !(pip.position.x === this.position.x && pip.position.y === this.position.y));
    }

    reverseDirection(): Direction {
        switch (this.direction) {
            case Direction.Up: return Direction.Down;
            case Direction.Down: return Direction.Up;
            case Direction.Left: return Direction.Right;
            case Direction.Right: return Direction.Left;
        }
    }

    randomDirection(): Direction {
        const directions = [Direction.Up, Direction.Down, Direction.Left, Direction.Right];
        return directions[Math.floor(Math.random() * directions.length)];
    }
}

import { Tile, Direction, Position, SpawnPoint } from '../types';
import { Pip } from './Pip';
import { Zog } from './Zog';

export class Game {
    board: Tile[][];
    pips: Pip[];
    zogs: Zog[];
    spawnPoints: SpawnPoint[];
    escapePod: Position;
    remainingTiles: number;
    maxTiles: number;
    placedTiles: Position[];
    timeRemaining: number;

    constructor(boardSize: number, spawnPoints: SpawnPoint[], escapePod: Position) {
        this.board = this.initializeBoard(boardSize);
        this.pips = [];
        this.zogs = [];
        this.spawnPoints = spawnPoints;
        this.escapePod = escapePod;
        this.remainingTiles = 3;
        this.maxTiles = 3;
        this.placedTiles = [];
        this.timeRemaining = 60;  // Set countdown timer (in seconds)

        this.spawnZogs(2); // Spawn 2 Zogs for now
        this.spawnPips(); // Spawn all Pips from spawn points
    }

    initializeBoard(size: number): Tile[][] {
        const board: Tile[][] = Array(size).fill([]).map(() =>
            Array(size).fill({ type: 'empty' }) // Create empty tiles
        );
        return board;
    }

    /**
     * Spawn Pips at predefined spawn points.
     */
    spawnPips(): void {
        this.spawnPoints.forEach(spawnPoint => {
            for (let i = 0; i < spawnPoint.pipCount; i++) {
                this.pips.push(new Pip({ ...spawnPoint.position }));
            }
        });
    }

    movePips(): void {
        this.pips.forEach(pip => {
            this.moveEntity(pip);
            if (this.isEscapePodReached(pip.position)) {
                // Remove pip if it reaches the escape pod
                this.pips = this.pips.filter(p => p !== pip);
            }
        });
    }

    /**
     * Spawn Zogs at random positions on the board.
     */
    spawnZogs(count: number): void {
        for (let i = 0; i < count; i++) {
            const randomPosition: Position = {
                x: Math.floor(Math.random() * this.board.length),
                y: Math.floor(Math.random() * this.board[0].length),
            };
            this.zogs.push(new Zog(randomPosition));
        }
    }


    moveZogs(): void {
        this.zogs.forEach(zog => {
            this.moveEntity(zog);
        });
    }

    moveEntity(entity: Pip | Zog): void {
        let { x, y } = entity.position;

        switch (entity.direction) {
            case Direction.Up: y -= 1; break;
            case Direction.Down: y += 1; break;
            case Direction.Left: x -= 1; break;
            case Direction.Right: x += 1; break;
        }

        if (this.isWall(x, y)) {
            // Reverse direction if wall is hit
            entity.direction = this.reverseDirection(entity.direction);
        } else if (this.board[y][x].type === 'arrow') {
            // Change direction if arrow tile is hit
            entity.direction = this.board[y][x].direction!;
        } else {
            // Move entity
            entity.position = { x, y };
        }
    }

    placeTile(x: number, y: number, direction: Direction): void {
        if (this.remainingTiles > 0) {
            this.board[y][x] = { type: 'arrow', direction };
            this.placedTiles.push({ x, y });
            this.remainingTiles -= 1;

            // Remove oldest tile if over the max tile limit
            if (this.placedTiles.length > this.maxTiles) {
                const oldestTile = this.placedTiles.shift()!;
                this.board[oldestTile.y][oldestTile.x] = { type: 'empty' };
            }
        }
    }

    isEscapePodReached(position: Position): boolean {
        return position.x === this.escapePod.x && position.y === this.escapePod.y;
    }

    isWall(x: number, y: number): boolean {
        return x < 0 || y < 0 || x >= this.board.length || y >= this.board[0].length;
    }

    reverseDirection(direction: Direction): Direction {
        switch (direction) {
            case Direction.Up: return Direction.Down;
            case Direction.Down: return Direction.Up;
            case Direction.Left: return Direction.Right;
            case Direction.Right: return Direction.Left;
        }
    }

    /**
     * Update game state (move Pips and Zogs, etc.)
     */
    updateGameState(): void {
        this.movePips();
        this.moveZogs();
        // More game state updates as needed, ie scores

        // Decrease countdown timer
        if (this.timeRemaining > 0) {
            this.timeRemaining -= 1;
        } else {
            // Handle game over due to time running out
            alert('Time is up!!!')
        }
    }

    checkGameOver(): boolean {
        // Player loses if no pips are left or time runs out
        return this.pips.length === 0 || this.timeRemaining <= 0;
    }
}

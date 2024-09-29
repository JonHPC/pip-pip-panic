export enum Direction {
    Up,
    Down,
    Left,
    Right,
}

export interface Tile {
    type: 'empty' | 'arrow';
    direction?: Direction;  // Arrow tiles will have a direction
}

export interface Position {
    x: number;
    y: number;
}

// export interface IPip {
//     position: Position;
//     direction: Direction;
// }
//
// export interface IZog {
//     position: Position;
//     direction: Direction;
// }

export interface SpawnPoint {
    position: Position;
    pipCount: number; // Number of pips to spawn
}

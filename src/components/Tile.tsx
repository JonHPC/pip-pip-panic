import React from 'react';
import { Tile } from '../types';

interface TileProps {
    tile: Tile;
}

const TileComponent: React.FC<TileProps> = ({ tile }) => {
    return <div className={`tile ${tile.type}`}>{/* Render based on tile type */}</div>;
};

export default TileComponent;

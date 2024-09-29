import React from 'react';

interface ControlsProps {
    onStart: () => void;
    onReset: () => void;
}

const Controls: React.FC<ControlsProps> = ({ onStart, onReset }) => (
    <div className="controls">
        <button onClick={onStart}>Start</button>
        <button onClick={onReset}>Reset</button>
    </div>
);

export default Controls;

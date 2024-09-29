import React, { useEffect, useState } from 'react';
import { formatTime } from '../utils';

interface TimerProps {
    initialTime: number;   // Initial time in seconds
    onTimeUp: () => void;  // Function to call when the timer reaches 0
}

const Timer: React.FC<TimerProps> = ({ initialTime, onTimeUp }) => {
    const [timeRemaining, setTimeRemaining] = useState(initialTime);

    useEffect(() => {
        if (timeRemaining > 0) {
            const interval = setInterval(() => {
                setTimeRemaining(timeRemaining - 1);
            }, 1000);

            return () => clearInterval(interval);  // Clear interval when unmounting
        } else {
            onTimeUp();  // Call the function to handle when the timer hits 0
        }
    }, [timeRemaining, onTimeUp]);

    return (
        <div className="timer">
            <p>{formatTime(timeRemaining)}</p>
        </div>
    );
};

export default Timer;

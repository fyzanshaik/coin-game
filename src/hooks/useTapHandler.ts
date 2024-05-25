import { useState } from 'react';

const useTapHandler = (initialScore: number, maxTaps: number) => {
    const [score, setScore] = useState<number>(initialScore);
    const [taps, setTaps] = useState<number>(0);

    const handleTap = () => {
        if (taps >= maxTaps) {
            alert('Tap limit reached! Please wait for the next period.');
            return;
        }

        setScore((prevScore) => prevScore + 1);
        setTaps((prevTaps) => prevTaps + 1);
    };

    return { score, handleTap, setScore };
};

export default useTapHandler;

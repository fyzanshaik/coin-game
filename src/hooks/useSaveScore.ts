import { useEffect, useRef } from 'react';
import axios from 'axios';

const useSaveScore = (valueToBeSent: number, username: string) => {
    const saveDataRef = useRef<(newScore: number) => void>();

    useEffect(() => {
        const saveData = async (newScore: number) => {
            const userData = {
                username: username || 'anonymous',
                score: newScore,
            };
            try {
                await axios.post('http://localhost:3001/api/user', userData);
            } catch (error) {
                console.error('Error sending data to server:', error);
            }
        };
        saveDataRef.current = saveData;
    }, [username]);

    useEffect(() => {
        if (saveDataRef.current && valueToBeSent > 0) {
            saveDataRef.current(valueToBeSent);
        }
    }, [valueToBeSent]);
};

export default useSaveScore;

import { useEffect, useState } from 'react';
import axios from 'axios';

interface UserData {
    score: number;
    username: string;
}

const useFetchUserData = (username: string) => {
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<UserData>(`http://localhost:3001/api/user?username=${username}`);
                const userData = response.data;
                setScore(userData.score || 0);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (username) {
            fetchData();
        }
    }, [username]);

    return { score, setScore };
};

export default useFetchUserData;

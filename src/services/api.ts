import axios from 'axios';

interface UserData {
    score: number;
    username: string;
}

export const fetchUserData = async (username: string): Promise<UserData> => {
    try {
        const response = await axios.get<UserData>(`http://localhost:3001/api/user?username=${username}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const saveUserData = async (userData: UserData) => {
    try {
        await axios.post('http://localhost:3001/api/user', userData);
    } catch (error) {
        console.error('Error saving user data:', error);
        throw error;
    }
};

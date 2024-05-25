import axios from 'axios';

interface UserData {
    score: number;
    username: string;
}
const url = `https://web3-bot-backend-1.vercel.app`

export const fetchUserData = async (username: string): Promise<UserData> => {
    try {
        const response = await axios.get<UserData>(`${url}/api/user?username=${username}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const saveUserData = async (userData: UserData) => {
    try {
        await axios.post(`${url}/api/user`, userData);
    } catch (error) {
        console.error('Error saving user data:', error);
        throw error;
    }
};

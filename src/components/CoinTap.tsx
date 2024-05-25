import React, { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import useFetchUserData from '../hooks/useFetchUserData';
import useTapHandler from '../hooks/useTapHandler';
import 'tailwindcss/tailwind.css';
import axios from 'axios';

const WalletBalance: React.FC<{ balance: number }> = ({ balance }) => (
    <div className="mb-4">
        <span role="img" aria-label="money emoji" className="mr-2">
            💰
        </span>
        Wallet: {balance}
    </div>
);

const CoinTap: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [showUsernameWarning, setShowUsernameWarning] = useState<boolean>(false);
    const [initialScore, setInitialScore] = useState<number>(0); 
    const [updatingScore, setUpdatingScore] = useState<number>(0); 

    useEffect(() => {
        WebApp.ready();
        const user = WebApp.initDataUnsafe.user;
        if (user && user.username) {
            setUsername(user.username);
        } else {
            setUsername('anonymous');
            setShowUsernameWarning(true);
        }
    }, []);

    const { score: fetchedWalletScore } = useFetchUserData(username);

    useEffect(() => {
        setInitialScore(fetchedWalletScore);
        setUpdatingScore(fetchedWalletScore);
    }, [fetchedWalletScore]);

    const { score: tappedScore, handleTap, setScore } = useTapHandler(initialScore, 100);

    useEffect(() => {
        setScore(initialScore);
    }, [initialScore, setScore]);

    useEffect(() => {
        setUpdatingScore(tappedScore);
    }, [tappedScore]);

    useEffect(() => {
        const interval = setInterval(async () => {
            const valueToBeSent = updatingScore - initialScore;
            if (valueToBeSent > 0) {
                try {
                    await axios.post('http://localhost:3001/api/user', {
                        username: username,
                        score: valueToBeSent
                    });
                    setInitialScore(updatingScore);
                } catch (error) {
                    console.error('Error sending data to server:', error);
                }
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [updatingScore, initialScore, username]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            {showUsernameWarning && (
                <div className="absolute top-0 right-0 m-4 bg-red-500 text-white px-2 py-1 rounded">
                    Username isn't loaded. You are playing as anonymous. Data won't be stored.
                </div>
            )}
            <h1 className="text-3xl font-bold mb-4">Tap to Earn Coins</h1>
            <WalletBalance balance={initialScore} />
            <p className="text-xl mb-4">Current Score: {updatingScore}</p>
            <button
                onClick={handleTap}
                className="relative w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg transition-transform transform active:scale-90"
            >
                💰
            </button>
        </div>
    );
};

export default CoinTap;

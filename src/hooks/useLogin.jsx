import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await axios.post(`http://localhost:3000/api/user/login`, { email, password });

            if (response.status === 200) {
                const { email, token, _id } = response.data;
                localStorage.setItem('user', JSON.stringify({ email, token, _id }));
                console.log(token);
                const user = { email, _id };
                dispatch({ type: 'LOGIN', payload: user });
                setSuccess(true);
                return true;
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || "Invalid email or password");
            } else {
                setError("An error occurred. Please try again.");
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, error, success };
};



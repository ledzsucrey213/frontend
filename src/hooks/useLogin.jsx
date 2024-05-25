import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [success, setSuccess] = useState(false);
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)
        setSuccess(false);

        try {
            const response = await axios.post(`http://localhost:3000/api/user/login`, { email: email, password: password });

            const json = response.data;

            if (response.status === 200) {
                const {email, token, _id } = response.data;
                localStorage.setItem('user', JSON.stringify(email, token, id))
                console.log(token)
                const user = { email, _id};
                dispatch({type : 'LOGIN', payload: user})
                setSuccess(true);
            }
            setIsLoading(true);
        } catch (error) {
            const axiosError = error;
            if (axiosError.response) {
                const responseError = axiosError.response.data;
                setError(responseError);
            }
        }
        finally {
            setIsLoading(false)
        }
    }

    return { login, isLoading, error, success }
}
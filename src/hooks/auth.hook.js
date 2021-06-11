import {useState, useCallback, useEffect} from 'react';
const storageName = 'userData';
export const useAuth = () => {
    const[access_token, setToken] = useState(null);
    const[user, setUser] = useState(null);
    const [ready, setReady] = useState(null);
    const login = useCallback((jwtToken, user) => {
        setToken(jwtToken);
        setUser(user);
        localStorage.setItem(storageName, JSON.stringify({user: user, access_token: jwtToken}));
    }, []);
    const logout = useCallback((jwtToken, user) => {
        setToken(null);
        setUser(null);
        localStorage.removeItem(storageName);

        //TODO записывать токен в куку
    }, []);

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem(storageName));
        if (data && data.access_token) {
            login(data.access_token, data.user);
        };
        setReady(true);
    }, [login]);
    return {login, logout, access_token, user, ready};
};

export const getUserIdFromStorage = () => {
    const data = JSON.parse(localStorage.getItem(storageName));

    return data && data.user && data.user.id ? data.user.id : null;
}

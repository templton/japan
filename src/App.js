import React from 'react';
import {client} from "./init";
import {ApolloProvider} from "@apollo/react-hooks";
import {BrowserRouter as Router} from "react-router-dom";
import {useRoutes} from "./routes";
import {useAuth} from './hooks/auth.hook';
import {AuthContext} from './context/AuthContext';
import {Loader} from "./components/Loader";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';


export const App = () => {


    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(() =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                    //TODO: Переопределить цвета темы
                    primary: {
                        light: '#5ddef4',
                        main: '#00acc1',
                        dark: '#007c91',
                        contrastText: prefersDarkMode ? '#FFF' : '#000',
                    },
                    //TODO: Цвет меню
                    secondary: {
                        light: '#ff616f',
                        main: '#ff1744',
                        dark: '#c4001d',
                        contrastText: prefersDarkMode ? '#FFF' : '#000',
                    },
                },
            }),
        [prefersDarkMode],
    );
    const {access_token, login, logout, user, ready} = useAuth();
    const isAuthenticated = !!access_token;
    const routes = useRoutes(isAuthenticated);
    if (!ready) {
        return <Loader/>
    }
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AuthContext.Provider value={{
                    access_token, login, logout, user, isAuthenticated
                }}>
                    <Router>
                        {routes}
                    </Router>
                </AuthContext.Provider>
            </ThemeProvider>
        </ApolloProvider>
    )
};

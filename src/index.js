import React from 'react';
import ReactDOM from 'react-dom';
import {CookiesProvider} from 'react-cookie';
import 'fontsource-roboto';
import {App} from './App';
// import * as serviceWorker from/

ReactDOM.render(
    <CookiesProvider>
        <App/>
    </CookiesProvider>,
    document.getElementById('root'));

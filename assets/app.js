import './styles/app.css';
import React from 'react';

import {Provider} from 'react-redux'
import Home from "./home";

import {createRoot} from 'react-dom/client';
import {store} from './store';
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <Home/>
    </Provider>
);
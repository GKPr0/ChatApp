import React from 'react';
import App from './app/layout/App';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './app/layout/styles.css';
import { store, StoreContext } from './app/stores/store';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <StoreContext.Provider value={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </StoreContext.Provider>
    </React.StrictMode>
);

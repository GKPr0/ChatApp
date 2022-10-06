import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import Unauthorized from '../../features/errors/Unauthorized';
import WelcomePage from '../../features/home/WelcomePage';
import ModalContainer from '../common/modals/ModalContainer';
import { useStore } from '../stores/store';

export default observer(function App() {
    const { commonStore, userStore } = useStore();

    useEffect(() => {
        if (commonStore.token) {
            userStore.getUser().finally(() => commonStore.setAppLoaded());
        } else {
            commonStore.setAppLoaded();
        }
    }, [commonStore, userStore]);


    useEffect(() => {
        commonStore.setToken(window.localStorage.getItem('jwt'));
    }, [commonStore]);

    return (
        <>
            <ToastContainer position="bottom-right" hideProgressBar />
            <ModalContainer />
            <Routes>
                <Route path="/" element={<WelcomePage />} />

                <Route path="unauthorized" element={<Unauthorized />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
});

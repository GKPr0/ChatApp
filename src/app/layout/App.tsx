import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ChatDashboard from '../../features/chats/ChatDashboard';
import NotFound from '../../features/errors/NotFound';
import Unauthorized from '../../features/errors/Unauthorized';
import WelcomePage from '../../features/home/WelcomePage';
import ModalContainer from '../common/modals/ModalContainer';
import RequireAuth from '../security/RequireAuth';
import { useStore } from '../stores/store';
import Layout from './Layout';

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
                <Route path="/" element={<Layout />}>
                    <Route element={<RequireAuth />}/>
                    <Route path="/chat" element={<ChatDashboard />} />
                </Route>
              
                <Route path="unauthorized" element={<Unauthorized />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
});

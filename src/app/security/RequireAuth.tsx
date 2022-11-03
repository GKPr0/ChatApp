import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useStore } from '../stores/store';


export default observer(function RequireAuth() {
    const { commonStore, userStore } = useStore();
    const { user } = userStore;
    const location = useLocation();

    useEffect(() => {
        if (commonStore.token) {
            userStore.getUser().finally(() => commonStore.setAppLoaded());
        } else {
            commonStore.setAppLoaded();
        }
    }, [commonStore, userStore]);
    if (!user)
        return <Navigate to="/" state={{ from: location }} replace />;
    else
        return <Outlet />;
});

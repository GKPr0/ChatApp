import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';

export default function Layout() {
    return (
        <Container style={{ padding: "1em 0.5em 0.5em 0.5em", width: "100vw", height: "100vh" }}>
            <NavBar />
            <Outlet />
        </Container>
    );
};

import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default observer(function NavBar() {
    const { userStore } = useStore();
    const { user, logout } = userStore;

    return (
        <Menu inverted fixed="top" secondary>
            <Container fluid>
                <Menu.Item name="Chat" as={Link} to={"/chat"} icon="chat" />
                <Menu.Item name="Profile" as={Link} to={`/profiles/${user?.username}`} icon="user" />
                <Menu.Item position="right" icon="power" onClick={logout} />
            </Container>
        </Menu>
    );
});

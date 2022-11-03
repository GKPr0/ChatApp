import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container, Menu, Dropdown } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default observer(function NavBar() {
    const { userStore } = useStore();
    const { user, logout } = userStore;

    return (
        <Menu inverted fixed="top" secondary>
            <Container fluid>
                <Menu.Item header name="ChatMeIn" />
                <Menu.Item position="right">
                    <Dropdown pointing="top left" text={user?.username}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={'/profile/'} text="My profile" icon="user" />
                            <Dropdown.Item onClick={logout} text="Logout" icon="power" />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    );
});

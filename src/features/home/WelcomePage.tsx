import './styles.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import RegisterForm from '../accounts/RegisterForm';
import LoginForm from '../accounts/LoginForm';

export default observer(function WelcomePage() {
    const { modalStore, userStore } = useStore();

    return (
        <Segment inverted textAlign="center" vertical className="mainPage">
            <Container text>
                <Header as="h1" inverted>
                    ChatMeIn
                </Header>

                {userStore.isLoggedIn ? (
                    <Button as={Link} to="/dashboard" size="huge" inverted>
                        Welcome {userStore.user !== null ? userStore.user.username : ''}
                    </Button>
                ) : (
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm />)} size="huge" inverted>
                            Login!
                        </Button>
                        <Button onClick={() => modalStore.openModal(<RegisterForm />)} size="huge" inverted>
                            Register!
                        </Button>
                    </>
                )}
            </Container>
        </Segment>
    );
});

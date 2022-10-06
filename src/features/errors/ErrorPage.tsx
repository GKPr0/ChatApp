import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';

interface Props {
    message: string;
    icon: SemanticICONS;
}

export default function ErrorPage({ message, icon }: Props) {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <Segment placeholder>
            <Header icon>
                <Icon name={icon} />
                {message}
            </Header>
            <Segment.Inline>
                <Button onClick={goBack} primary>
                    Go Back
                </Button>
            </Segment.Inline>
        </Segment>
    );
}

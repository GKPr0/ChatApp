import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";

interface Props {
    profile: Profile;
}


export default observer(function ProfileCard({ profile }: Props) {

    function truncateLargeText(text: string) {
        if (text.length > 80) {
            return text.substring(0, 80) + "...";
        }
        return text;
    }

    return (
        <Card as={Link} to={`/profiles/${profile?.username}`}>
            <Card.Content>
                <Card.Header style={{display: "flex", justifyContent: "left", alignItems: "center"}}>
                    <Image circular floated="left" size="tiny" src={profile?.photo?.url || '/assets/user.png'} />{profile?.displayName}
                </Card.Header>
                <Card.Description>{profile?.bio && truncateLargeText(profile?.bio)}</Card.Description>
            </Card.Content>
        </Card>
    );
})
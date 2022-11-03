import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, Header, Item, Segment } from "semantic-ui-react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import ProfileEditForm from "./ProfileEditForm";


export default observer(function ProfilePage() {
    const { username } = useParams<{ username: string }>();
    const { profileStore } = useStore();
    const { profile, loadingProfile, loadProfile, isCurrentUser, uploadPhoto, uploadingPhoto } = profileStore;
    const [editMode, setEditMode] = useState(false);

    React.useEffect(() => {
        loadProfile(username!);
    }, [loadProfile, username]);

    if (loadingProfile) return <LoadingComponent content="Loading profile..." />

    return (
        <Segment>
            <Grid>
                <Grid.Column width={16}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size="small" src={profile?.image || "/assets/user.png"} />
                            <Item.Content verticalAlign="middle">
                                <Header as="h1" content={profile?.displayName} />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                
                <Grid.Column width={16}>
                    <Header floated="left" icon="user" content={"About " + profile?.displayName} />
                    {isCurrentUser && (
                        <Button floated="right" basic
                            content={editMode ? "Cancel" : "Edit Profile"}
                            onClick={() => setEditMode(!editMode)} />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {editMode ?
                        <ProfileEditForm setEditMode={setEditMode} />
                        :
                        <span style={{ whiteSpace: 'pre-wrap' }}>{profile?.bio}</span>
                    }
                </Grid.Column>
                {!isCurrentUser && (
                <Grid.Column width={16}>
                        <PhotoUploadWidget uploadPhoto={uploadPhoto} loading={uploadingPhoto} />
                </Grid.Column>
                 )}
            </Grid>
        </Segment>
    );
})
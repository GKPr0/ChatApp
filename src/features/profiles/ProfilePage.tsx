import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, Header, Item, Segment } from "semantic-ui-react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import ProfileCard from "./ProfileCard";
import ProfileEditForm from "./ProfileEditForm";


export default observer(function ProfilePage() {
    const { username } = useParams<{ username: string }>();
    const { profileStore } = useStore();
    const { profile, loadingProfile, loadProfile, isCurrentUser, setPhoto: uploadPhoto, settingPhoto: uploadingPhoto } = profileStore;
    const [editMode, setEditMode] = useState(false);

    React.useEffect(() => {
        loadProfile(username!);
    }, [loadProfile, username]);

    if (loadingProfile) return <LoadingComponent content="Loading profile..." />

    return (
        <Segment style={{marginTop: "2.3em"}}>
            <Grid>
                <Grid.Column width={16}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size="small" src={profile?.photo?.url || "/assets/user.png"} />
                            <Item.Content verticalAlign="middle">
                                <Header as="h1" content={profile?.displayName} />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>

                <Grid.Column width={16}>
                    <Header floated="left" icon="user" content={"About"} />
                    {isCurrentUser && (
                        <Button floated="right" basic
                            content={editMode ? "Cancel" : "Edit Profile"}
                            onClick={() => setEditMode(!editMode)} />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {editMode ?
                        <>
                            <PhotoUploadWidget uploadPhoto={uploadPhoto} loading={uploadingPhoto} />
                            <ProfileEditForm setEditMode={setEditMode} />
                        </>
                        :
                        <Header sub>{profile?.bio}</Header>
                    }
                </Grid.Column>
                <Grid.Column width={16}>
                    <ProfileCard profile={profile!} />
                </Grid.Column>
            </Grid>
        </Segment>
    );
})
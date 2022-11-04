import { makeAutoObservable, runInAction } from "mobx";
import { Profile, ProfileFormValues } from "../models/profile";
import agent from "../api/agent";
import { store } from "./store";

export default class ProfileStore {
    profile: Profile | null = null;
    loadingProfile: boolean = false;
    settingPhoto: boolean = false;


    constructor() {
        makeAutoObservable(this);
    }

    get isCurrentUser() {
        if (store.userStore.user && this.profile) {
            return store.userStore.user.username === this.profile.username;
        }
        return false;
    }

    setProfile(profile: Profile) {
        this.profile = profile;
    }

    setLoadingProfile(loading: boolean) {
        this.loadingProfile = loading;
    }

    setSettingPhoto(settingPhoto: boolean) {
        this.settingPhoto = settingPhoto;
    }

    loadProfile = async (username: string) => {
        this.setLoadingProfile(true);
        try {
            const profile = await agent.Profiles.get(username);
            this.setProfile(profile);
        } catch (err) {
            console.error(err);
        }
        this.setLoadingProfile(false);
    }

    editProfile = async (profile: ProfileFormValues) => {
        try {
            await agent.Profiles.edit(profile);
            runInAction(() => {
                if(profile.displayName && profile.displayName !== store.userStore.user?.displayName)
                    store.userStore.setDisplayName(profile.displayName);

                this.profile = {...this.profile, ...profile as Profile};
            });
        }catch (err) {
            console.error(err);
        }
    }

    setPhoto = async (file: Blob) => {
        this.setSettingPhoto(true);
        try {
            const photo = await agent.Profiles.setPhoto(file);
            runInAction(() => {
                if (this.profile) {
                    this.profile.photo = photo;
                    store.userStore.setPhoto(photo);
                }
            });
        } catch (err) {
            console.error(err);
        }
        this.setSettingPhoto(false);
    }

}

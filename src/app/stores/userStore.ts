import { makeAutoObservable } from 'mobx';
import agent from '../api/agent';
import { Photo } from '../models/photo';
import { User, UserFormValues } from '../models/user';
import { store } from './store';

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn(): boolean {
        return !!this.user;
    }

    setUser = (user: User | null) => {
        this.user = user;
    };

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            this.setUser(user);
            return user;
        } catch (error) {
            throw error;
        }
    };

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            this.setUser(user);
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    };

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.setUser(null);
    };

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            this.setUser(user);
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    };

    setPhoto = (photo: Photo) => {
        if (this.user) {
            this.user.photo = photo;
        }
    }

    setDisplayName = (displayName: string) => {
        if (this.user) {
            this.user.displayName = displayName;
        }
    }
}

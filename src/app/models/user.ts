import { Photo } from "./photo";

export interface User {
    email: string;
    username: string;
    displayName: string;
    token: string;
    photo?: Photo;
}

export interface UserFormValues {
    email: string;
    password: string;
    username?: string;
    displayName?: string;
}

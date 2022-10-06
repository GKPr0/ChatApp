export interface User {
    username: string;
    email: string;
    token: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    username?: string;
}

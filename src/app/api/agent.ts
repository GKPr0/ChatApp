import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { User, UserFormValues } from '../models/user';
import { store } from '../stores/store';

axios.defaults.baseURL = 'https://localhost:7166/api';

axios.interceptors.request.use((config) => {
    const token = store.commonStore.token;
    if (token) config!.headers!.Authorization = `Bearer ${token}`;
    return config;
});

axios.interceptors.response.use(
    async (response) => {
        return response;
    },
    (error: AxiosError) => {
        const { data, status } = error.response!;
        let d: any = data;

        switch (status) {
            case 400:
                if (typeof data === 'string') {
                    toast.error(data);
                } else if (d.hasOwnProperty('error')) {
                    toast.error(d.error);
                    throw [d.error];
                } else if (d.hasOwnProperty('errors')) {
                    throw d.errors;
                } else {
                    toast.error('Unknown Bad request');
                }
                break;
            case 401:
                toast.error('Unauthorized');
                break;
            case 403:
                toast.error('Forbidden');
                break;
            case 404:
                toast.error('Not found');
                break;
            case 500:
                toast.error('Server error');
                break;
            default:
                toast.error(`Unknown error: ${status}`);
                break;
        }
        return Promise.reject(error);
    }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
};

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
};


const agent = {
    Account
};

export default agent;

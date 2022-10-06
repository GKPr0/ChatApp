import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { makeAutoObservable, reaction } from 'mobx';
import { ServerError } from '../models/errors/serverError';

export default class CommonStore {
    error: ServerError | null = null;
    token: string | null = null;
    hubConnection: HubConnection | null = null;
    appLoaded = false;

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.token,
            (token) => {
                if (token) {
                    window.localStorage.setItem('jwt', token);
                    this.createHubConnection(token);
                } else {
                    window.localStorage.removeItem('jwt');
                    this.stopHubConnection();
                }
            }
        );
    }

    setServerError = (error: ServerError) => {
        this.error = error;
    };

    setToken = (token: string | null) => {
        this.token = token;
    };

    setAppLoaded = () => {
        this.appLoaded = true;
    };

    setHubConnection = (hubConnection: HubConnection | null) => {
        this.hubConnection = hubConnection;
    };

    createHubConnection = (token: string) => {
        if (this.hubConnection) return;

        console.log('Creating hub connection');
        var hubConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7166/api/hubs', {
                accessTokenFactory: () => token
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        hubConnection
            .start()
            .then(() => {
                console.log('Hub connection started');
                this.setHubConnection(hubConnection);
            })
            .catch((err) => console.error('Error while establishing connection', err.toString()));
    };

    stopHubConnection = () => {
        console.log('Stopping hub connection');
        this.hubConnection
            ?.stop()
            .then(() => console.log('Hub connection stopped'))
            .catch((err) => console.error('Error while stopping connection', err.toString()))
            .finally(() => this.setHubConnection(null));
    };
}

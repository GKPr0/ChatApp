import React from 'react';
import ErrorPage from './ErrorPage';

export default function Unauthorized() {
    return <ErrorPage message="Oops - looks like you dont have permission to go here." icon="lock" />;
}

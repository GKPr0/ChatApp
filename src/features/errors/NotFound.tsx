import React from 'react';
import ErrorPage from './ErrorPage';

export default function NotFound() {
    return <ErrorPage message="Oops - we've looked everywhere but couldn't find this." icon="search" />;
}

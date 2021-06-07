import { authenticationApi } from '@/_api/authentication.api.js';

export const requestOptions = {
    headers,
}

function headers() {
    const currentUser = authenticationApi.currentUserValue || {};
    const authHeader = currentUser.token ? { 'Authorization': 'Bearer ' + currentUser.token } : {}
    return {
        headers: {
            ...authHeader,
            'Content-Type': 'application/json'
        }
    }
}


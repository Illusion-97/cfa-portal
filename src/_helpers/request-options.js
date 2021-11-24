import store from '@/store/store.js';

export const requestOptions = {
    headers,
}

function headers() {
    const authHeader = store.getters.getToken ? { 'Authorization': 'Bearer ' + store.getters.getToken } : {}
    return {
        headers: {
            ...authHeader,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
        }
    }
}


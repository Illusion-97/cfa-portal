import store from '@/store/store.js';

export const requestOptions = {
    headers,
}

function headers() {
    const authHeader = store.getters.getToken ? { 'Authorization': 'Bearer ' + store.getters.getToken } : {}
    return {
        headers: {
            ...authHeader,
            'Content-Type': ['application/json', 'multipart/form-data'],
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods' :'DELETE, POST, GET, OPTIONS'
        }
    }
}


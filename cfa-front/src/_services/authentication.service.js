import { BehaviorSubject } from 'rxjs';
import store from '@/_helpers/store.js'

import requestOptions from '@/_helpers/request-options.js';
import handleResponse from '@/_helpers/handle-response.js';


const currentUserSubject = new BehaviorSubject(store.getters.getUtilisateur);

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
    return fetch(this.$apiUrl+'/users/authenticate', requestOptions.post({ username, password }))
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
//import { BehaviorSubject } from 'rxjs';
//import store from '@/_helpers/store.js'

//import { requestOptions } from '@/_helpers/request-options.js';
//import handleResponse from '@/_helpers/handle-response.js';
import {constantesApi} from "@/_api/constantes.api.js"
import axios from 'axios';


//const currentUserSubject = new BehaviorSubject(store.getters.getUtilisateur);

export const authenticationApi = {
    login,
    logout,
    //currentUser: currentUserSubject.asObservable(),
    //get currentUserValue () { return currentUserSubject.value }
};

function login(login, password) {

    let req = constantesApi.url + "authenticate";

    return axios
        .post(req,{login: login, password: password})
        //.then(handleResponse)
        .then((response) => {
            //TODO :
            //On stocke l'utilisateur dans le store
            //on stock le token
            console.log(response)
        })
        .catch((error) => console.log(error));

/*
    return fetch( constantesApi.url + 'users/authenticate', requestOptions.post({ login, password }))
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
        */
}

function logout() {
    // remove user from local storage to log user out
    //localStorage.removeItem('currentUser');
    //currentUserSubject.next(null);
}
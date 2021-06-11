//import { BehaviorSubject } from 'rxjs';

//import { requestOptions } from '@/_helpers/request-options.js';
//import handleResponse from '@/_helpers/handle-response.js';
//import {constantesApi} from "@/_api/constantes.api.js"
import axios from 'axios';
import store from '@/store/store.js';

export const authenticationApi = {
    login,
    logout,
};

function login(login, password) {

    let req = "authenticate";

    return axios
        .post(req,{login: login, password: password})
        //.then(handleResponse)
        .then((response) => {
            //on stock le token
            store.dispatch('login',response.data['token']);
            //On stocke l'utilisateur dans le store           
            store.dispatch('setUtilisateur', response.data['utilisateurDto']);            
        })
        .catch((error) => console.log(error));
}

function logout() {
    store.dispatch('logout');
    return
}
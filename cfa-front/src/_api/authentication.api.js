import axios from 'axios';
//import { requestOptions } from '@/_helpers/request-options.js';
//import handleResponse from '@/_helpers/handle-response.js';
import store from '@/store/store.js';
import { utilisateurApi } from "@/_api/utilisateur.api.js";

export const authenticationApi = {
    login,
    logout,
};

function login(login, password) {

    let req = "authenticate";
    return axios
        .post(req,{login: login, password: password})
        //.then(handleResponse)
        .then((response) => store.dispatch('login',response.data['token']))
        .then(() => utilisateurApi.getByLogin(login).then(response => store.dispatch('setUtilisateur', response)) )
        .catch((error) => console.log(error));
}

function logout() {
    store.dispatch('logout');
    return
}
import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';
//import handleResponse from '@/_helpers/handle-response.js';

export const congeApi = {
    getCongesByUtilisateurId,
    getTableConge,
    save
}

function getCongeByPage(page, max){
    let req = "utilisateurs/" + id + "/conges";
}

function getCongesByUtilisateurId(id) {

    let req = "utilisateurs/" + id + "/conges";

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

function getTableConge(id) {
    let req =  "conges/acquis-disponibles-restants/" + id;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));

}

function save(form) {
    let req =  "conges";

    return axios
        .post(req, form, requestOptions.headers())
        .then((response) => response)
        .catch((error) => console.log(error));

}
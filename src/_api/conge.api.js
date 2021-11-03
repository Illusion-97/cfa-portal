import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';
//import handleResponse from '@/_helpers/handle-response.js';

export const congeApi = {
    getById,
    getAllByPage,
    getCount,
    getCongesByUtilisateurId,
    getTableConge,
    save,
    deleteConge,

    getAllByIdEtudiant,
}

function getById(id){
    let req = `/conges/${id}`;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

function getAllByPage(page, size, search = ""){
    let req = `/conges/${page}/${size}/${search}`;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

function getCount(search = ""){
    let req = `/conges/count/${search}`;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch((error) => console.log(error));
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
        .then((response) =>  response)
        .catch((error) => console.log(error));

}

function deleteConge(id) {
    let req =  `conges/${id}`;

    return axios
        .delete(req, requestOptions.headers())
        .then((response) => response)
        .catch((error) => console.log(error));

}

function getAllByIdEtudiant(id) {
    let req =  `conges/utilisateur/${id}`;
  
    return axios
        .get(req, requestOptions.headers())
        .then((response) => response.data)
        .catch((error) => console.log(error));
  
  }
import axios from 'axios';
import {requestOptions} from '@/_helpers/request-options.js';
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

/**
 * Récupération du conge en fonction de son id
 * 
 * @param {*} id 
 * @returns 
 */

function getById(id){
    let req = `/conges/${id}`;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

/**
 * Récupération des congés avec pagination + recherche
 * 
 * @param {*} page 
 * @param {*} size
 * @param {*} search
 * @returns 
 */

function getAllByPage(page, size, search = ""){
    let req = `/conges/${page}/${size}/${search}`;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

/**
 * Méthode de recherche
 * 
 * @param {*} search
 * @returns 
 */

function getCount(search = ""){
    let req = `/conges/count/${search}`;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch((error) => console.log(error));
}

/**
 * Récupération des congés de l'utilisateur
 * 
 * @param {*} id 
 * @returns 
 */

function getCongesByUtilisateurId(id) {

    let req = "utilisateurs/" + id + "/conges";

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

/**
 * Récupération des des congés acquis / dispo / restant
 * 
 * @param {*} id 
 * @returns 
 */

function getTableConge(id) {
    let req =  "conges/acquis-disponibles-restants/" + id;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));

}

/**
 * Save du congé
 * 
 * @param {*} id 
 * @returns 
 */

function save(form) {
    let req =  "conges";

    return axios
        .post(req, form, requestOptions.headers())
        .then((response) =>  response)
        .catch((error) => console.log(error));

}

/**
 * Suppression du congé
 * 
 * @param {*} id 
 * @returns 
 */

function deleteConge(id) {
    let req =  `conges/${id}`;

    return axios
        .delete(req, requestOptions.headers())
        .then((response) => response)
        .catch((error) => console.log(error));

}

/**
 * Récupération des congés avec l'id de l'étudiant
 * 
 * @param {*} id 
 * @returns 
 */

function getAllByIdEtudiant(id) {
    let req =  `conges/utilisateur/${id}`;
  
    return axios
        .get(req, requestOptions.headers())
        .then((response) => response.data)
        .catch((error) => console.log(error));
  
  }
import axios from 'axios';
import {requestOptions} from '@/_helpers/request-options.js';

export const passageExamenApi = {
    getById,
    getAllByPage,
    getCount,
    save,
    deletePassageExamen,
}

/**
 * Récupération du passade d'examen en fonction de son id
 * 
 * @param {*} id 
 * @returns 
 */

function getById(id){
    let req = `/passageExamens/${id}`;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

/**
 * Récupération des passages d'examens avec pagination + recherche
 * 
 * @param {*} page 
 * @param {*} size
 * @param {*} search
 * @returns 
 */

function getAllByPage(page, size, search = ""){
    let req = `/passageExamens/${page}/${size}/${search}`;

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
    let req = `/passageExamens/count/${search}`;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch((error) => console.log(error));
}

/**
 * Save du passageExamen
 * 
 * @param {*} id 
 * @returns 
 */

function save(form) {
    let req =  "passageExamens";

    return axios
        .post(req, form, requestOptions.headers())
        .then((response) => response)
        .catch((error) => console.log(error));

}

/**
 * Suppression de l'examen
 * 
 * @param {*} id 
 * @returns 
 */

function deletePassageExamen(id) {
    let req =  `passageExamens/${id}`;

    return axios
        .delete(req, requestOptions.headers())
        .then((response) => response)
        .catch((error) => console.log(error));

}
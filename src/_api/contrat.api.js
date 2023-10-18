import axios from 'axios';
import {requestOptions} from '@/_helpers/request-options.js';

const END_POINT = "contrats";

export const contratApi = {
    getById,
    getAllByPage,
    getCount,
    save,
    deleteContrat,
};

/**
 * Récupération du contrat en fonction de son id
 * 
 * @param {*} id 
 * @returns 
 */

function getById(id){
    let req = `/${END_POINT}/${id}`;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

/**
 * Récupération des contrats avec pagination + recherche
 * 
 * @param {*} page 
 * @param {*} size
 * @param {*} search
 * @returns 
 */

function getAllByPage(page, size, search = ""){
    let req = `/${END_POINT}/${page}/${size}/${search}`;
  
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
    let req = `/${END_POINT}/count/${search}`;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch((error) => console.log(error));
}

/**
 * Save du contrat
 * 
 * @param {*} id 
 * @returns 
 */

function save(form) {
    let req =  `${END_POINT}`;

    return axios
        .post(req, form, requestOptions.headers())
        .then((response) => response)
        .catch((error) => console.log(error));

}

/**
 * Suppression du contrat
 * 
 * @param {*} id 
 * @returns 
 */

function deleteContrat(id) {
    let req =  `${END_POINT}/${id}`;

    return axios
        .delete(req, requestOptions.headers())
        .then((response) => response)
        .catch((error) => console.log(error));

}
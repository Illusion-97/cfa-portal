import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';
//import handleResponse from '@/_helpers/handle-response.js';

export const adresseApi = {
    getById,
    getAllByPage,
    getCount,
    save,
    deleteAdresse,
    getAllAdresses,
}

const END_POINT = "adresses";

/**
 * Récupération de l'adresse en fonction de son id
 * 
 * @param {*} id 
 * @returns 
 */
function getById(id) {
    let req = `/adresses/${id}`;

    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

/**
 * Récuparation des adresses avec pagination + recherche
 * 
 * @param {*} page
 * @param {*} size
 * @param {*} search 
 * @returns 
 */

function getAllByPage(page, size, search = "") {
    let req = `/${END_POINT}/${page}/${size}/${search}`;

    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

/**
* 
* Récupération de toutes les adresses
* 
*/

function getAllAdresses() {
    return axios
        .get(`${END_POINT}`, requestOptions.headers())
        .then((response) => response.data)
        .catch((error) => console.log(error));
}

/**
* Méthode de recherche pour les adresses
* 
* @param {*} search 
* @returns 
*/
function getCount(search = "") {
    let req = `/adresses/count/${search}`;

    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch((error) => console.log(error));
}

/**
 * Sauvegarde d'une adresse
 * 
 * @param {*} form 
 * @returns 
 */

function save(form) {
    let req = "adresses";

    return axios
        .post(req, form, requestOptions.headers())
        .then((response) => response)
        .catch((error) => console.log(error));

}

/**
 * Supression d'une adresse
 * 
 * @param {*} id 
 * @returns 
 */
function deleteAdresse(id) {
    let req = `adresses/${id}`;

    return axios
        .delete(req, requestOptions.headers())
        .then((response) => response)
        .catch((error) => console.log(error));

}
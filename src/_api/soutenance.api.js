import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';
//import handleResponse from '@/_helpers/handle-response.js';

const END_POINT = "soutenance";

export const soutenanceApi = {
    getBySoutenanceId,
    saveSoutenance,
    updateSoutenance,
    deleteSoutenance,
    countSoutenanceByPromotionId,
    getSoutenanceByPromotionId,
    getPageSoutenanceByPromotionId,
}

/**
 * Récupération d'une Soutenance
 * 
 * @param {*} id 
 * @returns 
 */
function getBySoutenanceId(id) {
    let req = `/${END_POINT}/${id}`;

    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

/**
*Save d'une soutenance
* 
* @param {*} soutenance 
* @returns 
*/
export async function saveSoutenance(soutenance) {
    return axios
        .post(`${END_POINT}`, soutenance, requestOptions.headers())
        .then((response) => response.data)
        .catch((error) => console.log(error));
}

/**
*Update d'une soutenance
* 
* @param {*} soutenance 
* @returns 
*/
function updateSoutenance(soutenance) {
    return axios
        .put(`${END_POINT}`, soutenance, requestOptions.headers())
        .then((response) => response.data)
        .catch((error) => console.log(error));
}

/**
* Suppression d'une soutenance 
* 
* @param {*} id 
* @returns 
*/

export async function deleteSoutenance(id) {
    return axios
        .delete(`${END_POINT}/${id}`, requestOptions.headers())
        .then((response) => response.data)
        .catch((error) => console.log(error));
}

/**
 * Méthode de recherche pour soutenance
 * 
 * @param {*} id 
 * @returns 
 */
function countSoutenanceByPromotionId(id) {
    let req = `/${END_POINT}/count/${id}`;

    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch((error) => console.log(error));
}

/**
 * Récupération des soutenance par id de promotion
 * 
 * @param {*} id 
 * @returns 
 */
function getSoutenanceByPromotionId(id) {
    let req = `/${END_POINT}/promotion/${id}`;

    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

/**
 * Récupération des soutenance par id de promotion, page, size 
 * 
 * @param {*} id 
 * @param {*} page 
 * @param {*} size 
 * @returns 
 */
function getPageSoutenanceByPromotionId(id, page, size) {
    let req = `/${END_POINT}/promotion/${id}/${page}/${size}`;

    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}
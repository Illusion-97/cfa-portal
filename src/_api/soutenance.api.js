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
    genererLstSoutenance,
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
    const { etudiant,jour, heure, minAccueil, minEntretien, minQuestion, minEntretienFinal, minDeliberation, hasSpecialManagement } = soutenance
    const date = parseDateStringToDateObject(jour);
    Object.keys(soutenance).forEach(key => console.log(key, soutenance[key]))

    const payload = {
        studentId: etudiant.id,
        examDate: parseTimeToDate(date, heure),
        minAccueil: parseTimeToDate(date, minAccueil),
        minEntretien: parseTimeToDate(date, minEntretien),
        minQuestion: parseTimeToDate(date, minQuestion),
        minEntretienFinal: parseTimeToDate(date, minEntretienFinal),
        minDeliberation: parseTimeToDate(date, minDeliberation),
        hasSpecialManagement: hasSpecialManagement,
    }
    Object.keys(payload).forEach(key => console.log(key, payload[key]))

    return axios
        .post(`${END_POINT}`, payload, requestOptions.headers())
        .then((response) => response.data)
        .catch((error) => console.log(error));
}

const parseTimeToDate = (date, time) => {
    const [hours, minutes] = time.split(':');
    date = new Date(date);
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    console.log('examDate', date)
    return date;
}
const parseDateStringToDateObject = (dateString) => {
    const date = new Date();
    const [year, month, day] = dateString.split('-');
    date.setFullYear(parseInt(year));
    date.setMonth(parseInt(month) - 1);
    date.setDate(parseInt(day));
    return date;
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
    let req = `/${END_POINT}/count/promotion/${id}`;

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

/**
 * Récupération pdf List soutenance
 *
 * @param {*} id
 * @returns
 */
function genererLstSoutenance(promotion, id){
    let req = `${END_POINT}/generer/${promotion}/${id}`;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
  }

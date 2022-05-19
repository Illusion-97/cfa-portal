import axios from 'axios';
import {
    requestOptions
} from '@/_helpers/request-options.js';

const END_POINT = "interventions";

export const interventionApi = {
    getIntervention,
    getAllIntervention,
    getInterventionById,
    insertIntervention,
    countIntervention,

    getById,
    getAllByPage,
    getCount,
    save,
    deleteIntervention,

    findStudentsByPromoInterventionId,
    findPromoByInterventionId,
    findAssignementByInterventionId,
    findTrainerByInterventionId,    

    findAllSupportByInterventionId,
}

/**
 * 
 * @param {*} page 
 * @param {*} size 
 * @param {*} keyword 
 * @returns 
 */
function getIntervention(page, size, keyword = "") {
    const url = `${process.env.VUE_APP_API_URL}/${END_POINT}/${page - 1}/${size}/${keyword}`
    return axios
        .get(url, requestOptions.headers())
        .then(response => response.data)
        .catch(err => console.error(err));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getInterventionById(id) {
    const url = `/${END_POINT}/${id}`
    return axios
        .get(url, requestOptions.headers())
        .then(response => response)
        .catch(err => console.error(err));
}

/**
 * 
 * @param {*} form 
 * @returns 
 */
function insertIntervention(form) {
    const url = `/${END_POINT}`;
    return axios
        .post(url, form, requestOptions.headers())
        .then(response => response)
        .catch(err => console.error(err));
}

/**
 * 
 * @returns 
 */
function getAllIntervention() {
    const url = `/${END_POINT}/with-object`;
    return axios
        .get(url, requestOptions.headers())
        .then(response => response.data)
        .catch(err => console.error(err));
}

/**
 * 
 * @param {*} keyword 
 * @returns 
 */
function countIntervention(keyword = "") {
    const url = `/${END_POINT}/count/${keyword}`;
    return axios
        .get(url, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch(err => console.error(err));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getById(id) {
    let req = `/${END_POINT}/${id}`;

    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

/**
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
 * @param {*} search 
 * @returns 
 */
function getCount(search = "") {
    let req = `/${END_POINT}/count/${search}`;

    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} intervention 
 * @returns 
 */
function save(intervention) {
    return axios
        .post(`${END_POINT}`, intervention, requestOptions.headers())
        .then((response) => response.data)
        .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function deleteIntervention(id) {
    return axios
        .delete(`${END_POINT}/${id}`, requestOptions.headers())
        .then((response) => response)
        .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function findStudentsByPromoInterventionId(id) {
    const url = `${END_POINT}/${id}/etudiants-promotion`
    // console.log(url);
    return axios
        .get(url, requestOptions.headers())
        .then(response => response.data)
        .catch(err => console.error(err))
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function findPromoByInterventionId(id) {
    const url = `${END_POINT}/${id}/promotions`
    return axios
        .get(url, requestOptions.headers())
        .then(response => response.data)
        .catch(err => console.error(err))
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function findAssignementByInterventionId(id) {
    const url = `${END_POINT}/${id}/devoirs`
    return axios
        .get(url, requestOptions.headers())
        .then(response => response.data)
        .catch(err => console.error(err))
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function findTrainerByInterventionId(id) {
    const url = `${END_POINT}/${id}/formateurs`
    return axios
        .get(url, requestOptions.headers())
        .then(response => response.data)
        .catch(err => console.error(err))
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function findAllSupportByInterventionId(id) {
    const url = `${END_POINT}/${id}/supports`
    return axios
        .get(url, requestOptions.headers())
        .then(response => response.data)
        .catch(err => console.error(err))
}

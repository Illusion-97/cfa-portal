import axios from 'axios';
import {requestOptions} from '@/_helpers/request-options.js';

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
    update,
    deleteIntervention,
    findStudentsByPromoInterventionId,
    findPromoByInterventionId,
    findAssignementByInterventionId,
    findTrainerByInterventionId,
    findAllSupportByInterventionId,
    fetchAllInterventionsDG2Http,
    fetchInterventionsDG2ByIdPromotion,
    findInterventionByPromotionId,
    countInterventionByPromotionId
}

/**
 * 
 * @param {*} page 
 * @param {*} size 
 * @param {*} keyword 
 * @returns affiche les interventions par page
 */
function getIntervention(page, size, keyword = "") {
    const url = `/${END_POINT}/${page - 1}/${size}/${keyword}`
    return axios
        .get(url, requestOptions.headers())
        .then(response => response.data)
        .catch(err => console.error(err));
}

/**
 * 
 * @param {*} id intervention
 * @returns affiche l'intervention selon son id
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
 * @param {*} form formulaire intervention
 * @returns insert une intervention
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
 * @returns affiche toutes les interventions
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
 * @returns affiche le nombre d'intervention
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
 * @param {*} id intervention
 * @returns affiche l'intervention selon son id
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
 * @returns affiche les interventions par pages
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
 * @returns affiche le nombre d'intervention
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
 * @param {*} intervention formulaire intervention
 * @returns insert une intervention
 */
function save(intervention) {
    return axios
        .post(`${END_POINT}`, intervention, requestOptions.headers())
        .then((response) => response.data)
        .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} intervention formulaire intervention
 * @returns modifie une intervention
 */
function update(intervention) {
    return axios
        .put(`${END_POINT}`, intervention, requestOptions.headers())
        .then((response) => response)
        .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id intervention
 * @returns supprime une intervention selon son id
 */
function deleteIntervention(id) {
    return axios
        .delete(`${END_POINT}/${id}`, requestOptions.headers())
        .then((response) => response)
        .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id intervention
 * @returns affiches les étudiants selon l'intervention id
 */
function findStudentsByPromoInterventionId(id) {
    const url = `${END_POINT}/${id}/etudiants-promotion`
    return axios
        .get(url, requestOptions.headers())
        .then(response => response.data)
        .catch(err => console.error(err))
}

/**
 * 
 * @param {*} id intervention
 * @returns affiche les promos selon l'intervention id
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
 * @param {*} id intervention
 * @returns affiche les devoirs selon l'intervention id
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
 * @param {*} id intervention
 * @returns affiche les formateurs selon l'intervention id
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
 * @param {*} id intervention
 * @returns affiche les supports selon l'intervention id
 */
function findAllSupportByInterventionId(id) {
    const url = `${END_POINT}/${id}/supports`
    return axios
        .get(url, requestOptions.headers())
        .then(response => response.data)
        .catch(err => console.error(err))
}

/**
 * Récupération des centres de DG2
 * 
 * @param {*} logInUser (id user)) 
 * @returns Liste des interventions de dawan
 */
function fetchAllInterventionsDG2Http(logInUser) {
    let headers = requestOptions.headers();
    let req = `/${END_POINT}/dg2`;

  headers.headers["X-AUTH-TOKEN"] = `${logInUser.logInUser.email}:${logInUser.logInUser.password}`;

  return axios.get(req, headers);
  
  }

  /**
 * Récupération des centres de DG2 par promotion
 * 
 * @param {*} logInUser (id user)  promoId (id de la promo)
 * @returns Liste des interventions par promo
 */

function fetchInterventionsDG2ByIdPromotion(logInUser, promoId){

    let headers = requestOptions.headers();
    let req = `/${END_POINT}/dg2/${promoId}`;

    headers.headers["X-AUTH-TOKEN"] = `${logInUser.email}:${logInUser.password}`;

    return axios.get(req, headers);
  } 
  
  /**
 * Récupération des intervention en fonction de promotion id
 * 
 * @param {*} id 
 * @param {*} page 
 * @param {*} size 
 * @param {*} search 
 * @returns 
 */
function findInterventionByPromotionId(id, page, size, search) {
    let req = `/${END_POINT}/promotion/${id}/${page}/${size}/${search}`;
    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}
  
/**
 * Méthode de recherche pour intervention
 * 
 * @param {*} id 
 * @param {*} search 
 * @returns 
 */
function countInterventionByPromotionId(id, search) {
    let req = `/${END_POINT}/countInterventionByPromotion/${id}/${search}`;
    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

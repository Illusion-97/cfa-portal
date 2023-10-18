import axios from 'axios';
import {requestOptions} from '@/_helpers/request-options.js';

const END_POINT = "formations";

export const formationApi = {
  getAll,
  getAllByPage,
  deleteFormation,
  getFormation,
  insertFormation,
  getFormationById,
  countFormation,
  getFormationByPromoId,
  getFormationByCursusId,
  getInterventionsByFormationId,
  fetchAllFormationsDG2Http,
}

/**
 * 
 * @returns affiche toutes les formations
 */
function getAll() {
  return axios
    .get("/formations", requestOptions.headers())
    .then(response => response.data)
    .catch(err => console.error(err))
}

/**
 * 
 * @param {*} page 
 * @param {*} size 
 * @param {*} search 
 * @returns affiche toutes les informations par pages
 */
function getAllByPage(page, size, search = "") {
  let url = `/${END_POINT}/${page - 1}/${size}/${search}`;

  return axios
    .get(url, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} page 
 * @param {*} size 
 * @returns affiche toutes les informations par pages
 */
function getFormation(page, size) {
  const url = `/${END_POINT}/${page - 1}/${size}`;

  return axios.get(url, requestOptions.headers())
    .then(response => response.data)
    .catch(err => console.error(err))
}

/**
 * 
 * @param {*} form formulaire formation
 * @returns insert le formulaire formation
 */
function insertFormation(form) {
  const url = `/${END_POINT}`;

  return axios.post(url, form, requestOptions.headers())
    .then(response => response)
    .catch(err => console.error(err))
}

/**
 * 
 * @param {*} id formation
 * @returns affiche la formation selon son id
 */
function getFormationById(id) {
  const url = `/${END_POINT}/${id}`;

  return axios.get(url, requestOptions.headers())
    .then(response => response.data)
    .catch(err => console.error(err))
}

/**
 * 
 * @param {*} id  formation 
 * @returns supprime la formation selon son id
 */
function deleteFormation(id) { // EN STAND BY DANS LE BACKEND
  const url = `/${END_POINT}/${id}`
  return axios
    .delete(url, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} key 
 * @returns affiche le nombre de formations
 */
function countFormation(key = "") {
  const url = `/${END_POINT}/count/${key}`;
  return axios.get(url, requestOptions.headers())
    .then(response => response.data["nb"])
    .catch(err => console.error(err))
}

/**
 * 
 * @param {*} id  promotion
 * @returns affiche les formations selon l'id de la promotion
 */
function getFormationByPromoId(id) {
  const url = `/${END_POINT}/getFormationByPromoId/${id}`

  return axios
    .get(url, requestOptions.headers()) //faire la méthode pour recupérer le cursus
    .then(response => response.data)
    .catch((error) => console.log(error))
}

/**
 * 
 * @param {*} id cursus
 * @returns affiche les formations selon l'id du cursus
 */
function getFormationByCursusId(id) {
  const url = `/${END_POINT}/getFormationByCursusId/${id}`

  return axios
    .get(url, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error))
}

/**
 * 
 * @param {*} id formation
 * @returns affiche les interventions selon l'id de la formation
 */
function getInterventionsByFormationId(id) {
  const url = `/${END_POINT}/${id}/interventions`;

  return axios.get(url, requestOptions.headers())
    .then(response => response.data)
    .catch(err => console.error(err))
}

/**
 * 
 * @param {*} logInUser 
 * @returns 
 */
/* test de recup de la requete import dg2 */
function fetchAllFormationsDG2Http(logInUser) {
  let headers = requestOptions.headers();

  headers.headers["X-AUTH-TOKEN"] = `${logInUser.logInUser.email}:${logInUser.logInUser.password}`;

  return axios.get(`${process.env.VUE_APP_PROD_API_URL}${END_POINT}/dg2`, headers

  );
}

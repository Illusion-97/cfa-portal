import axios from 'axios';
import {
    requestOptions
} from '@/_helpers/request-options.js';
//import handleResponse from '@/_helpers/handle-response.js';

const END_POINT = "etudiants";

export const etudiantApi = {
    getById,
    getAllByPage,
    getCount,
    save,
    deleteEtudiant,

    getFormateurReferent,
    getPromotions,
    getNotesById,
    getCountNotes,
    getCountDevoirs,
    getDevoirsById,
    getAbsencesById,
    getCountAbsence,
    getGroupes,
    getInterventionByIdEtudiantByWeek,
    getNotesByIdEtudiant,
    getEtudiantsByInterventionIdwithDevoirsAndAbsence,
    fetchAllEtudiantDG2Http,
    getAccueilEtudiant
}

/**
 * 
 * @param {*} id 
 * @returns 
 */       
function getById(id) {
    let req = `/etudiants/${id}`;

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
    let req = `/etudiants/${page}/${size}/${search}`;

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
    let req = `/etudiants/count/${search}`;

    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} form 
 * @returns 
 */
function save(form) {
    let req = "etudiants";

    return axios
        .post(req, form, requestOptions.headers())
        .then((response) => response)
        .catch((error) => console.log(error));

}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function deleteEtudiant(id) {
    let req = `etudiants/${id}`;

    return axios
        .delete(req, requestOptions.headers())
        .then((response) => response)
        .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getFormateurReferent(id) {

    let req = "etudiants/" + id + "/formateurReferent";
    return axios
        .get(req, requestOptions.headers())
        //.then(handleResponse)
        .then((response) => response.data)
        .catch((error) => console.log(error));
}

//ATTENTION : un étudiant a potentiellement plusieurs promotions
//affichage du referent de promotion ? tous ? un seul ? si un seul, lequel ?
//Pour l'instant, on affiche le referent de la premiere promotion recu par l'api

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getPromotions(id) {

    let req = "etudiants/" + id + "/promotions";
    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @param {*} page 
 * @param {*} size 
 * @returns 
 */
function getNotesById(id, page, size) {

    let req = "etudiants/" + id + "/notes/" + page + "/" + size
    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

/**
 * 
 * @returns 
 */
function getCountNotes() {

    let req = `/notes/count`;
    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch((error) => console.log(error));
}

/**
 * 
 * @returns 
 */
function getCountDevoirs() {
    let req = `/devoirs/count`;

    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @param {*} page 
 * @param {*} size 
 * @returns 
 */
function getDevoirsById(id, page, size) {

    let req = "etudiants/" + id + "/devoirs/" + page + "/" + size
    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @param {*} page 
 * @param {*} size 
 * @returns 
 */
function getAbsencesById(id, page, size) {

    let req = "etudiants/" + id + "/absences/" + page + "/" + size
    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

/**
 * 
 * @returns 
 */
function getCountAbsence() {

    let req = `/absences/count`;
    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getGroupes(id){
    let req = "etudiants/" + id + "/groupes";
    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getInterventionByIdEtudiantByWeek(id){
    let req = "etudiants/" + id + "/interventions/semaines";
    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getNotesByIdEtudiant(id) {
    let req = "notes/note-etudiant/" + id;
    return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

function getEtudiantsByInterventionIdwithDevoirsAndAbsence(id, search = ""){

    let req = "etudiants/"+ id + "/etudiants-abcences-devoirs/" + search;
    return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

/**
 * Récupération des etudiants de DG2
 * 
 * @param {*} id 
 * @returns 
 */

/* test de recup de la requete import dg2 */
function fetchAllEtudiantDG2Http(logInUser) {
    let headers = requestOptions.headers();

  headers.headers["X-AUTH-TOKEN"] = `${logInUser.logInUser.email}:${logInUser.logInUser.password}`;

  console.log(headers)

  return axios.get(`${process.env.VUE_APP_PROD_API_URL}${END_POINT}/dg2`, headers

  );
  
  }

  /**
 * 
 * @param {*} id 
 * @returns 
 */
function getAccueilEtudiant(id) {

    let req = `/${END_POINT}/accueil-etudiant/` + id;
    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

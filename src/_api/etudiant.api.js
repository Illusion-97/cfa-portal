import axios from 'axios';
import {requestOptions} from '@/_helpers/request-options.js';
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
    getProjets,
    getInterventionByIdEtudiantByWeek,
    getNotesByIdEtudiant,
    getEtudiantsByInterventionIdwithDevoirsAndAbsence,
    fetchAllEtudiantDG2Http,
    fetchAllEtudiantDG2HttpByIdPromotion,
    getAccueilEtudiant,
    getEtudiantsByPromotionByPage,
    getCountEtudiantsByPromotion,
    sendMail
}

/**
 * Récupération d'un etudiant par sont id
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
 * Récupération des étudiants par page, size, search 
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
 * Méthode de recherche 
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
 * Save d'un dossier projet 
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
 * Delete d'un dossier projet par dossier projet
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
 * Récupération d'un formateur par l'id etudiant
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
 * Récupération d'une promotions par l'id etudiant
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
 * Récupération Notes par etudiant
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
 * Méthode de recherche pour notes
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
 * Méthode de recherche pour devoirs
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
 * Récupération des devoir par etudiant
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
 * Récupération des abscence par etudiant
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
 * Méthode de recherche pour absence
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
 * Récupération des groupes par etudiant
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
 * Récupération des projets par etudiant
 *
 * @param {*} id
 * @returns
 */
function getProjets(id){
    let req = "etudiants/" + id + "/projets";
    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

/**
 * Récupération des intervention par etudiant pour la semaine
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
 * Récupération des notes par etudiant 
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

/**
 * Récupération d'un etudiant par intervention qui ont des devoir et absence
 * 
 * @param {*} id 
 * @param {*} search 
 * @returns 
 */

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
 * @param {*} logInUser (id user) 
 * @returns Liste des étudiants de dawan
 */

function fetchAllEtudiantDG2Http(logInUser) {

  let headers = requestOptions.headers();

  let req = `/${END_POINT}/dg2`;

  headers.headers["X-AUTH-TOKEN"] = `${logInUser.logInUser.email}:${logInUser.logInUser.password}`;

  return axios.get(req, headers);
  
  }

  /**
   * Récupération des etudiants depuis Dawan.org en fonction de promotion 
   * 
   * @param {*} logInUser 
   * @param {*} promoId 
   * @returns 
   */

  function fetchAllEtudiantDG2HttpByIdPromotion(logInUser, promoId){
    let headers = requestOptions.headers();
  let req = `/${END_POINT}/dg2/${promoId}`;

  headers.headers["X-AUTH-TOKEN"] = `${logInUser.email}:${logInUser.password}`;

  return axios.get(req, headers);
  }

  /**
 * TODO a retirer si plus utiliser
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

  /**
 * Récupération des etudiants en fonction de promotion
 * 
 * @param {*} id 
 * @param {*} page 
 * @param {*} size 
 * @param {*} search 
 * @returns 
 */
function getEtudiantsByPromotionByPage(id, page, size, search) {
    let req = `/${END_POINT}/promotion/${id}/${page}/${size}/${search}`;
    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

/**
 * Méthode de recherche pour promotion
 * 
 * @param {*} id 
 * @param {*} search 
 * @returns 
 */
function getCountEtudiantsByPromotion(id, search) {
    let req = `/${END_POINT}/countEtudiantByPromotion/${id}/${search}`;
    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

/**
 * Méthode D'envoi de mail
 *
 * @param from
 * @param to
 * @param header
 * @param msg
 * @returns
 */
function sendMail(from, to, header, msg) {
    let req = `/${END_POINT}/mail`;

    const params = new URLSearchParams();
    params.append('from', from);
    params.append('to', to);
    params.append('header', header);
    params.append('msg', msg);

    return axios
        .post(req, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then((response) => response)
        .catch((error) => console.log(error));
}

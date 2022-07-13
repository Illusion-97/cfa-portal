import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

export const noteApi = {
    getById,
    getAllByPage,
    getCount,
    save,
    deleteNote,
    getAllByIdExamen,
    getAllByIdEtudiant,
    getAllNotes,
    getAllByPrmotionIdAndExamenId,
    getAllByInterventionIdAndExamenId,
}

const END_POINT = "notes";

/**
 * 
 * @param {*} id note
 * @returns affiche la note par id
 */
function getById(id) {
    let req = `/notes/${id}`;

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
 * @returns affiche les notes par pages
 */
function getAllByPage(page, size, search = "") {
    let req = `/notes/${page}/${size}/${search}`;

    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} search valeur de notes
 * @returns affiche nombre de notes
 */
function getCount(search = "") {
    let req = `/notes/count/${search}`;

    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} form formulaire notes
 * @returns enregistre formulaire notes
 */
function save(form) {
    let req = "notes";

    return axios
        .post(req, form, requestOptions.headers())
        .then((response) => response)
        .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id note
 * @returns efface la note
 */
function deleteNote(id) {
    let req = `notes/${id}`;

    return axios
        .delete(req, requestOptions.headers())
        .then((response) => response)
        .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id etudiant
 * @returns affiche toutes les notes par étudiant
 */
function getAllByIdEtudiant(id) {
    let req = `notes/etudiant/${id}`;

    return axios
        .get(req, requestOptions.headers())
        .then((response) => response.data)
        .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id examen
 * @returns affiche toutes les notes par examen
 */
function getAllByIdExamen(id) {
    let req = `notes/examen/${id}`;
    return axios
        .get(req, requestOptions.headers())
        .then((response) => response.data)
        .catch((error) => console.log(error));
}
/**
 * 
 * @param {*} id promotion
 * @returns liste de notes par promotion
 */
function getAllByPrmotionIdAndExamenId(idP,idE){
    let req = `notes/promotion-examen/${idP}/${idE}`
    return axios
    .get(req, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
/**
 * 
 * @param {*} id intervention
 * @returns liste de notes par intervention
 */
 function getAllByInterventionIdAndExamenId(idI,idE,search=null){
    let req = `notes/intervention-examen/${idI}/${idE}`
     if(search != null){
        req =  `notes/intervention-examen/${idI}/${idE}/${search}`
     }
    return axios
    .get(req, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
/**
 * 
 * @returns affiche toutes les notes
 */
function getAllNotes() {
    return axios
        .get(`${END_POINT}`, requestOptions.headers())
        .then((response) => response.data)
        .catch((error) => console.log(error));
}
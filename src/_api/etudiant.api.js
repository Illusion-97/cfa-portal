import axios from 'axios';
import {
    requestOptions
} from '@/_helpers/request-options.js';
//import handleResponse from '@/_helpers/handle-response.js';

export const etudiantApi = {
    getById,
    getAllByPage,
    getCount,
    save,
    deleteEtudiant,

    getFormateurReferent,
    getManager,
    getPromotions,
    getNotesById,
    getCountNotes,
    getCountDevoirs,
    getDevoirsById,
    getAbsencesById,
    getCountAbsence,
    getGroupes,

}

function getById(id) {
    let req = `/etudiants/${id}`;

    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

function getAllByPage(page, size, search = "") {
    let req = `/etudiants/${page}/${size}/${search}`;

    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

function getCount(search = "") {
    let req = `/etudiants/count/${search}`;

    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch((error) => console.log(error));
}

function save(form) {
    let req = "etudiants";

    return axios
        .post(req, form, requestOptions.headers())
        .then((response) => response)
        .catch((error) => console.log(error));

}

function deleteEtudiant(id) {
    let req = `etudiants/${id}`;

    return axios
        .delete(req, requestOptions.headers())
        .then((response) => response)
        .catch((error) => console.log(error));
}

function getFormateurReferent(id) {

    let req = "etudiants/" + id + "/formateurReferent";
    return axios
        .get(req, requestOptions.headers())
        //.then(handleResponse)
        .then((response) => response.data)
        .catch((error) => console.log(error));
}

function getManager(id) {

    let req = "etudiants/" + id + "/manager";
    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

//ATTENTION : un étudiant a potentiellement plusieurs promotions
//affichage du referent de promotion ? tous ? un seul ? si un seul, lequel ?
//Pour l'instant, on affiche le referent de la premiere promotion recu par l'api
function getPromotions(id) {

    let req = "etudiants/" + id + "/promotions";
    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}


function getNotesById(id, page, size) {

    let req = "etudiants/" + id + "/notes/" + page + "/" + size
    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

function getCountNotes() {

    let req = `/notes/count`;
    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch((error) => console.log(error));
}

function getCountDevoirs() {
    let req = `/devoirs/count`;

    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch((error) => console.log(error));
}

function getDevoirsById(id, page, size) {

    let req = "etudiants/" + id + "/devoirs/" + page + "/" + size
    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

function getAbsencesById(id, page, size) {

    let req = "etudiants/" + id + "/absences/" + page + "/" + size
    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

function getCountAbsence() {

    let req = `/absences/count`;
    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch((error) => console.log(error));
}

function getGroupes(id){
    let req = "etudiants/" + id + "/groupes";
    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}
import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';
//import handleResponse from '@/_helpers/handle-response.js';

export const etudiantApi = {
    getFormateurReferent,
    getManager,
    getPromotions,
    getNotesById,
    getCountNotes,
    getCountDevoirs,
    getDevoirsById,
    getAbsencesById,
    getCountAbsence,
    
}

function getFormateurReferent(id) {

    let req =  "etudiants/" + id + "/formateurReferent";
    return axios        
        .get(req, requestOptions.headers())
        //.then(handleResponse)
        .then((response) => response.data)      
        .catch((error) => console.log(error));
}

function getManager(id){

    let req =  "etudiants/" + id + "/manager";
    return axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
}

//ATTENTION : un étudiant a potentiellement plusieurs promotions
//affichage du referent de promotion ? tous ? un seul ? si un seul, lequel ?
//Pour l'instant, on affiche le referent de la premiere promotion recu par l'api
function getPromotions(id) {

    let req =  "etudiants/" + id + "/promotions";

    return axios
      .get(req, requestOptions.headers())
      .then(response => response.data[0])
      .catch((error) => console.log(error));
}

function getNotesById(id, page, size){
    let req = "etudiants/" + id + "/notes/" +page+ "/" +size
    
    return axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
}
function getCountNotes(){
    let req = `/notes/count`;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch((error) => console.log(error));
}
function getCountDevoirs(){
    let req = `/devoirs/count`;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch((error) => console.log(error));
}

function getDevoirsById(id,page,size){
    let req = "etudiants/" + id + "/devoirs/" +page+ "/" +size
    
    return axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
}
function getAbsencesById(id,page,size){
    let req = "etudiants/" + id + "/absences/" +page + "/" + size
    
    return axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
}

function getCountAbsence(){
    let req = `/absences/count`;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch((error) => console.log(error));
}
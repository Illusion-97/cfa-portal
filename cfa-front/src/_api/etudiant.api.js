// import handleResponse from '@/_helpers/handle-response.js';
// import { requestOptions } from '@/_helpers/request-options.js';
import axios from 'axios';
import {constantesApi} from "@/_api/constantes.api.js"

export const etudiantApi = {
    getFormateurReferent,
    getManager,
    getPromotions,
}

function getFormateurReferent(id) {

    let req =  constantesApi.url + "etudiants/" + id + "/formateurReferent";
    return axios
        // .get(req,{headers: requestOptions.headers()})
        // .then(handleResponse)
        .get(req)
        .then((response) => response.data)      
        .catch((error) => console.log(error));

}

function getManager(id){

    let req =  constantesApi.url + "etudiants/" + id + "/manager";
    return axios
      .get(req)
      .then(response => response.data)
      .catch((error) => console.log(error));
}

//ATTENTION : un étudiant a potentiellement plusieurs promotions
//affichage du referent de promotion ? tous ? un seul ? si un seul, lequel ?
//Pour l'instant, on affiche le referent de la premiere promotion recu par l'api
function getPromotions(id) {

    let req =  constantesApi.url + "etudiants/" + id + "/promotions";

    return axios
      .get(req)
      .then(response => response.data[0])
      .catch((error) => console.log(error));
}
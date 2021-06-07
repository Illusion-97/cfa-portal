// import handleResponse from '@/_helpers/handle-response.js';
// import { requestOptions } from '@/_helpers/request-options.js';
import axios from 'axios';

export const etudiantApi = {
    getFormateurReferent,
    getManager,
    getPromotions,
}

function getFormateurReferent(id) {

    let req = "http://localhost:8080/AppliCFABack/etudiants/" + id + "/formateurReferent";
    return axios
        // .get(req,{headers: requestOptions.headers()})
        // .then(handleResponse)
        .get(req)
        .then((response) => response.data)      
        .catch((error) => console.log(error));

}

function getManager(id){

    let req = "http://localhost:8080/AppliCFABack/etudiants/" + id + "/manager";
    return axios
      .get(req)
      .then(response => response.data)
      .catch((error) => console.log(error));
}

function getPromotions(id) {

    let req = "http://localhost:8080/AppliCFABack/etudiants/" + id + "/promotions";

    return axios
      .get(req)
      .then(response => response.data[0])
      .catch((error) => console.log(error));
}
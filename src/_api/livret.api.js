import axios from 'axios';
import {requestOptions} from '@/_helpers/request-options.js';

const END_POINT = "livretEvaluation";

export const livretApi = {
    getlivretEtudiant
}

/**
 * Récupération des étudiants du groupes
 * 
 * @param {*} id 
 * @returns 
 */

 function getlivretEtudiant(id){
    let req = `/${END_POINT}/livret-etudiant/${id}`;
  
    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
  }
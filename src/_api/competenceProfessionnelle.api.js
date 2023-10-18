import axios from 'axios';
import {requestOptions} from '@/_helpers/request-options.js';

const END_POINT = "competenceProfessionnelles";

export const competenceProfessionnelleApi = {
  getAll,
  getById,
  save,
  update,
  deleteAt,
  getAllByIdActiviteType,
};

/**
 * Récupération des compétences professionnelle 
 * 
 * @returns 
 */

function getAll(){
    return axios
      .get(`${END_POINT}`, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));
}
  
/**
 * Récupération des compétences professionnelle par promotions 
 * 
 * @param {*} id 
 * @returns 
 */

function getById(id) {
    return axios
      .get(`${END_POINT}/${id}/promotions`, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));
}
  

  
/**
*Save d'une competence Professionnelle
* 
* @param {*} competenceProfessionnelles 
* @returns 
*/ 
function save(at) {
    return axios
      .post(`${END_POINT}`,at, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));
}
  
/**
*Update d'une competence Professionnelle
* 
* @param {*} competenceProfessionnelles 
* @returns 
*/ 
  
function update(at) {
    return axios
      .put(`${END_POINT}`,at, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));
}
  
/**
* Suppression d'une competenceProfessionnelles 
* 
* @param {*} id 
* @returns 
*/
  
function deleteAt(id) {
    return axios
      .delete(`${END_POINT}/${id}`, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));
}

/**
 * Récupération d'une compétence professionnelle par activiteType
 * 
 * @param {*} id 
 * @returns 
 */

function getAllByIdActiviteType(id) {
  let req =  `${END_POINT}/activiteType/${id}`;

 return axios
        .get(req, requestOptions.headers())
        .then((response) => response.data)
        .catch((error) => console.log(error));
}
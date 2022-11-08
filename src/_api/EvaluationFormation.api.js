import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "evaluationsFormations";

export const evaluationFormationApi = {

  getById,
  save,
  update,
  deleteEF,
};

// function getAll(){
//   return axios
//     .get(`${END_POINT}`, requestOptions.headers())
//     .then((response) => response.data)
//     .catch((error) => console.log(error));
// }


/**
 * Récupération des evaluationsFormations
 * 
 * @param {*} id 
 * @returns 
 */

function getById(id) {
  return axios
    .get(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 *Save d'une evaluationsFormations
 * 
 * @param {*} evaluationsFormations 
 * @returns 
 */

function save(at) {
  return axios
    .post(`${END_POINT}`,at, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 *Update d'une evaluationsFormations
 * 
 * @param {*} evaluationsFormations 
 * @returns 
 */

function update(at) {
  return axios
    .put(`${END_POINT}`,at, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * Suppression d'une evaluationsFormations 
 * 
 * @param {*} id 
 * @returns 
 */ 

function deleteEF(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
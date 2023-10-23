import axios from 'axios';
import {requestOptions} from '@/_helpers/request-options.js';

const END_POINT = "activiteTypes";

export const activiteTypeApi = {
  getAll,
  getAllByIdPromotion,
  getById,
  getActiviteTypesByCursus,
  save,
  update,
  deleteAt,
};

/**
 * Récupération de toutes les Activités types
 * 
 */

function getAll(){
  return axios
    .get(`${END_POINT}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * Récupération des Activités types par promotion
 * 
 * @param {*} id 
 * @returns 
 */

function getAllByIdPromotion(id){

    let req = `/${END_POINT}/promotion/${id}`;
    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error)); 
}

/**
 * Récupération d'une Activités types par promotions
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
 * Récupération des Activités types par cursus
 * 
 * @param {*} id 
 * @returns 
 */ 
function getActiviteTypesByCursus(id){

  let req = `/${END_POINT}/cursus/${id}`;
  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error)); 
}

/**
 *Save d'une activité type
 * 
 * @param {*} activiteTypes 
 * @returns 
 */ 
function save(at) {
  return axios
    .post(`${END_POINT}`,at, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 *Update d'une activité type
 * 
 * @param {*} activiteTypes 
 * @returns 
 */ 

function update(at) {
  return axios
    .put(`${END_POINT}`,at, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * Suppression d'une activiteTypes 
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
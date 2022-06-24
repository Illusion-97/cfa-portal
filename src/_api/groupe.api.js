import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "groupeEtudiants";

export const groupeApi = {
  getById,
  getAllByPage,
  getCount,
  save,
  deleteGroupe,

  getEtudiants,
};

/**
 * Récupération du groupe en fonction de son id
 * 
 * @param {*} id 
 * @returns 
 */

function getById(id){
  let req = `/${END_POINT}/${id}`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
}

/**
 * Récupération des groupes avec pagination + recherche
 * 
 * @param {*} page 
 * @param {*} size
 * @param {*} search
 * @returns 
 */

function getAllByPage(page, size, search = ""){
  let req = `/${END_POINT}/${page}/${size}/${search}`;

  return  axios
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

function getCount(search = ""){
  let req = `/${END_POINT}/count/${search}`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data["nb"])
      .catch((error) => console.log(error));
}

/**
 * Save du groupe
 * 
 * @param {*} id 
 * @returns 
 */

function save(groupe) {
  return axios
    .post(`${END_POINT}`, groupe, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * Suppression du groupe
 * 
 * @param {*} id 
 * @returns 
 */

function deleteGroupe(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * Récupération des étudiants du groupes
 * 
 * @param {*} id 
 * @returns 
 */

function getEtudiants(id){
  let req = `/${END_POINT}/${id}/etudiants`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
}
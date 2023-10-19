import axios from 'axios';
import {requestOptions} from '@/_helpers/request-options.js';

const END_POINT = "utilisateursRoles";

export const utilisateursRoleApi = {
  getById,
  getAllByPage,
  getCount,
  save,
  deleteUtilisateurRole,
  getAll,
};

/**
 * Récupération du role utilisateur en fonction de son id
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
 * Récupération des utilisateurs roles avec pagination + recherche
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
 * Save du role utilisateur
 * 
 * @param {*} id 
 * @returns 
 */

function save(id) {
  return axios
    .post(`${END_POINT}`, id, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}


/**
 * Suppression du role utilisateur
 * 
 * @param {*} id 
 * @returns 
 */

function deleteUtilisateurRole(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}


/**
 * Récupération des utilisateurs roles 
 * 
 */

function getAll(){
  let req = `/utilisateursRoles`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
}
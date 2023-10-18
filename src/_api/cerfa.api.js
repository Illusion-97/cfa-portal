import axios from 'axios';
import {requestOptions} from '@/_helpers/request-options.js';

const END_POINT = "cerfa";

export const cerfaApi = {
  getById,
  save,
  deleteCerfa,
  getAllByPage,
  getCount,
  getByIdEtudiant,

};

/**
 * Récupération du cerfa en fonction de l'id
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
 * Récupération du cerfa en fonction de l'id etudiant
 * 
 * @param {*} id 
 * @returns 
 */

function getByIdEtudiant(id){
  let req = `/${END_POINT}/etudiant/${id}`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
}

/**
 * Récupération des cerfas avec pagination + recherche
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
 * Save d'un cerfa
 * 
 * @param {*} cerfa 
 * @returns 
 */

function save(cerfa) {
  let req =`${END_POINT}`
  return axios
    .post(req,cerfa, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * Suppression d'un cerfa
 * 
 * @param {*} id 
 * @returns 
 */

function deleteCerfa(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * Méthode de recherche
 * 
 * @param {*} search 
 * @returns 
 */

function getCount(search = ""){
  let req = `/cerfa/count/${search}`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data["nb"])
      .catch((error) => console.log(error));
}
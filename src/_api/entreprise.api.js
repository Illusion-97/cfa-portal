import axios from 'axios';
import {requestOptions} from '@/_helpers/request-options.js';
//import handleResponse from '@/_helpers/handle-response.js';

export const entrepriseApi = {
    getById,
    getAllByPage,
    getCount,
    save,
    update,
    deleteEntreprise,
    getAllEntreprises,
    getAll,
}

const END_POINT = "entreprises";

/**
 * Récupération de l'entreprise en fonction de son id
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
 * Récupération des entreprise avec pagination + recherche
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
 * Récupération de toutes les entreprises
 */

function getAllEntreprises() {
    return axios
      .get(`${END_POINT}`, requestOptions.headers())
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
    let req = `/${END_POINT}/count/${search}`;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch((error) => console.log(error));
}

/**
 * Save de l'entreprise
 * 
 * @param {*} id 
 * @returns 
 */

function save(entreprise) {
  return axios
    .post(`/${END_POINT}`, entreprise, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * Update de l'entreprise
 * 
 * @param {*} id 
 * @returns 
 */

 function update(entreprise) {
  return axios
    .post(`/${END_POINT}`, entreprise, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * Suppression de l'entreprise
 * 
 * @param {*} id 
 * @returns 
 */


function deleteEntreprise(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}


/**
 * Récupération de toutes les entreprises
 */

function getAll(){
  let req = `/entreprises`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
}

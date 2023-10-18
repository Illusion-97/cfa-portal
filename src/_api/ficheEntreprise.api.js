import axios from 'axios';
import {requestOptions} from '@/_helpers/request-options.js';

const END_POINT = "ficheEntreprises";

export const ficheEntrepriseApi = {
  getById,
  getAllByPage,
  getCount,
  save,
  deleteFicheEntreprise,
  getAll,
  getByIdEtudiant,
};

/**
 * Récupération de la fiche en fonction de son id
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
 * Récupération de la fiche en fonction de l'id étudiant
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
 * Récupération des fiches avec pagination + recherche
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
 * Save de la fiche
 * 
 * @param {*} form
 * @returns 
 */

function save(form) {
  return axios
    .post(`/${END_POINT}`, form, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * Suppression de la fiche
 * 
 * @param {*} id 
 * @returns 
 */

function deleteFicheEntreprise(id) {
  return axios
    .delete(`/${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * Récupération des fiches
 */

function getAll(){
  let req = `/ficheEntreprises`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
}
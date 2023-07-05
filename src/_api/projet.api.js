import axios from "axios";
import { requestOptions } from "@/_helpers/request-options.js";

const END_POINT = "projets";

export const projetApi = {
  getById,
  getAllByPage,
  getCount,
  save,
  update,
  deleteProjet,
  getByIdEtudiant,
  getAll,
};

function getAll(){
  let req = `/${END_POINT}`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
}

/**
 * Récupération du projet en fonction de son id
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
 * Récupération des projets avec l'id de l'étudiant
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
 * Récupération des projets avec pagination + recherche
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
 * Save du projet
 *
 * @param {*} id
 * @returns
 */

function save(projet) {
  return axios
    .post(`${END_POINT}`, projet, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * Save du projet
 *
 * @param {*} id
 * @returns
 */

function update(projet) {
  return axios
      .post(`${END_POINT}`, projet, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));
}


/**
 * Suppression du projet
 * 
 * @param {*} id 
 * @returns 
 */

function deleteProjet(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

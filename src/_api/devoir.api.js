import axios from "axios";
import { requestOptions } from "@/_helpers/request-options.js";

const END_POINT = "devoirs";

export const devoirApi = {
  getById,
  getAllByPage,
  getCount,
  update,
  save,
  deleteDevoir,
  getAllByInterventionId,

  
};

/**
 * Récupération du devoir en fonction de son id
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
 * Récupération des devoirs avec pagination + recherche
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
 * Mise à jour du devoir
 * 
 * @param {*} id 
 * @returns 
 */

function update(devoirDto){
  return axios
    .put(`${END_POINT}`, devoirDto)
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * Save du devoir
 * 
 * @param {*} id 
 * @returns 
 */

function save(devoir) {
  return axios
    .post(`${END_POINT}`, devoir, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * Suppression du devoir
 * 
 * @param {*} id 
 * @returns 
 */

function deleteDevoir(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * Récupération des devoirs avec l'id de l'intervention
 * 
 * @param {*} id 
 * @returns 
 */

function getAllByInterventionId(id) {
let req = `${END_POINT}/intervention/${id}`;
  return axios
    .get(req, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
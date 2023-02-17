import axios from "axios";
import { requestOptions } from "@/_helpers/request-options.js";
//import handleResponse from '@/_helpers/handle-response.js';

export const tuteurApi = {

  getEtudiantByTuteurByPage,
  getCountSearch,
  getCount, 
  
};

const END_POINT = "tuteur";

/**
 * 
 * @param {*} page 
 * @param {*} size 
 * @returns 
 */
function getEtudiantByTuteurByPage(id, page, size, search = "") {
 
  let req = `/${END_POINT}/${id}/etudiants/${page}/${size}/${search}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

// function getEtudiantByTuteurByPage(page, size, search = "") {
//   let req = `/${END_POINT}/${id}/etudiant/${page}/${size}/${search}`;

//   return axios
//     .get(req, requestOptions.headers())
//     .then(response => response.data)
//     .catch((error) => console.log(error));
// }

/**
 * 
 * @param {*} search 
 * @returns 
 */
function getCountSearch(id, search = "") {
  let req = `/${END_POINT}/${id}/count/${search}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data["nb"])
    .catch((error) => console.log(error));
}



function getCount(id) {
  let req = `/${END_POINT}/${id}/count`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data["nb"])
    .catch((error) => console.log(error));
}
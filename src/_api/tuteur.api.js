import axios from "axios";
import { requestOptions } from "@/_helpers/request-options.js";
//import handleResponse from '@/_helpers/handle-response.js';

export const tuteurApi = {

  getEtudiantByTuteurByPage,
  getCount, 
  
};

const END_POINT = "tuteur";

/**
 * 
 * @param {*} page 
 * @param {*} size 
 * @returns 
 */
function getEtudiantByTuteurByPage(page, size, search= "") {
  let req = `/${END_POINT}/1/etudiants/${page}/${size}/${search}`;

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
function getCount(search = "") {
  let req = `/${END_POINT}/count/${search}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data["nb"])
    .catch((error) => console.log(error));
}

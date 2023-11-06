import axios from "axios";
import {requestOptions} from "@/_helpers/request-options.js";
//import handleResponse from '@/_helpers/handle-response.js';

export const tuteurApi = {

  getEtudiantByTuteurByPage,
  getCountSearch,
  getCount, 
  getById,
  getAllEtudiantsByTuteurId,
  getAllEtudiantsByTuteurIdBySearch,
  save,
};

const END_POINT = "tuteur";

/**
 * 
 * @param {*} search 
 * @returns 
 */
function getEtudiantByTuteurByPage(id, page, size, search = "") {
 
  let req = `/${END_POINT}/${id}/etudiants/${page}/${size}/${search}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

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
  let req = `/${END_POINT}/${id}/etudiants/count`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data["nb"])
    .catch((error) => console.log(error));
}

function getAllEtudiantsByTuteurId(id) {
  let req = `/${END_POINT}/${id}/etudiants`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data["nb"])
    .catch((error) => console.log(error));
}

function getAllEtudiantsByTuteurIdBySearch(id, search) {
  let req = `/${END_POINT}/${id}/etudiants/count/${search}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data["nb"])
    .catch((error) => console.log(error));
}

function save(tuteur) {
  return axios
    .post(`${END_POINT}`,tuteur, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}


function getById(id) {
  let req = `/${END_POINT}/${id}`;

  return axios
  .get(req, requestOptions.headers())
  .then(response => response.data)
  .catch((error) => console.log(error));
}
import axios from "axios";
import { requestOptions } from "@/_helpers/request-options.js";
//import handleResponse from '@/_helpers/handle-response.js';

export const utilisateurApi = {
  //getById,
  getByIdWithObject,
  getAdresseById,
  getPlanningById,
  getAllUsers,
  getAllUsersByEntreprise,
  getAllUsersByAdresse,
  addUser,
  updateUser,
  deleteUser,
};

const END_POINT = "utilisateurs";
const ADRESSE = "adresse";
const ENTREPRISE = "entreprise";

/*
function getById(id) {
    let req =  "utilisateurs/" + id;
    return fetch(req, requestOptions.get())
        //.then(handleResponse);
}
*/

function getByIdWithObject(id) {
  let req = "utilisateurs/" + id + "/with-object";

  return axios
    .get(req, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function getAdresseById(id) {
  let req = "utilisateurs/" + id + "/adresse";

  return axios
    .get(req, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function getPlanningById(id) {
  let req = "utilisateurs/" + id + "/planning";

  return axios
    .get(req, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function getAllUsers() {
  return axios
    .get(`${END_POINT}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function getAllUsersByEntreprise() {
  return axios
    .get(`${END_POINT}/${ENTREPRISE}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function getAllUsersByAdresse() {
  return axios
    .get(`${END_POINT}/${ADRESSE}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function addUser(user) {
  return axios
    .post(`${END_POINT}`, user, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function updateUser(user) {
  return axios
    .post(`${END_POINT}`, user, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function deleteUser(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

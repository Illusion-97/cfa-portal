import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';
//import handleResponse from '@/_helpers/handle-response.js';

export const utilisateurApi = {
    getById,
    getByIdWithObject,
    getAdresseById,
    getPlanningById,
};

function getById(id) {
    let req =  "utilisateurs/" + id;

    return axios
      .get(req, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));
}

function getByIdWithObject(id) {
  let req =  "utilisateurs/" + id + "/with-object";

  return axios
    .get(req, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function getAdresseById(id) {
    let req = "utilisateurs/" + id + "/adresse";

  return axios
    .get(req, requestOptions.headers())
    .then((response) => (response.data))
    .catch((error) => console.log(error));
}

function getPlanningById(id) {
    let req = "utilisateurs/" + id + "/planning"

  return axios
    .get(req, requestOptions.headers())
    .then((response) => (response.data))
    .catch((error) => console.log(error));
}
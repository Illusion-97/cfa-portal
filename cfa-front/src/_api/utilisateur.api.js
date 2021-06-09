import axios from 'axios';
import {constantesApi} from "@/_api/constantes.api.js"

export const utilisateurApi = {
    getById,
    getByIdWithObject,
    getAdresseById,
    getPlanningById,
};

function getById(id) {
    let req =  constantesApi.url + "utilisateurs/" + id;

    return axios
      .get(req)
      .then((response) => response.data)
      .catch((error) => console.log(error));
}

function getByIdWithObject(id) {
  let req =  constantesApi.url + "utilisateurs/" + id + "/with-object";

  return axios
    .get(req)
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function getAdresseById(id) {
    let req = constantesApi.url + "utilisateurs/" + id + "/adresse";

  return axios
    .get(req)
    .then((response) => (response.data))
    .catch((error) => console.log(error));
}

function getPlanningById(id) {
    let req = constantesApi.url + "utilisateurs/" + id + "/planning"

  return axios
    .get(req)
    .then((response) => (response.data))
    .catch((error) => console.log(error));
}
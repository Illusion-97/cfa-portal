import axios from "axios";
import { requestOptions } from "@/_helpers/request-options.js";

const END_POINT = "projets";

export const projetApi = {
  getAllProjets,
  addProjet,
  updateProjet,
  deleteProjet,
};

function getAllProjets() {
  return axios
    .get(`${END_POINT}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function addProjet(projet) {
  return axios
    .post(`${END_POINT}`, projet, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function updateProjet(projet) {
  return axios
    .post(`${END_POINT}`, projet, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function deleteProjet(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "signatures";

export const signatureApi = {

  getById,
  getByUtilisateurId,
  save,
  update,
  deleteEF,
};
function getByUtilisateurId(id) {
  return axios
    .get(`${END_POINT}/utilisateur/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
function getById(id) {
  return axios
    .get(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function save(signature) {
  return axios
    .post(`${END_POINT}`,signature, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
function update(signature) {
  return axios
    .put(`${END_POINT}`,signature, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
function deleteEF(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

import axios from "axios";
import { requestOptions } from "@/_helpers/request-options.js";

const END_POINT = "/dossierProfessionnel";

export const dossierProfessionnelApi = {
  getById,
  deleteDossierProfessionnel,
  save,
  getAll,
  getByIdEtudiant,
  saveDossierProfessionnel

}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getById(id) {
  let req = `${END_POINT}/${id}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getByIdEtudiant(id) {
  let req = `${END_POINT}/etudiant/${id}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @returns 
 */
function getAll() {
  let req = `${END_POINT}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} form 
 * @param {*} id 
 * @returns 
 */
function save(form, id) {
  return axios
    .post(`${END_POINT}/save/${id}`, form, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @param {*} idetudiant 
 * @returns 
 */
function deleteDossierProfessionnel(id, idetudiant) {
  return axios
    .delete(`${END_POINT}/${idetudiant}/delete/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function saveDossierProfessionnel(form, id) {
  return axios
    .post(`${END_POINT}/save/etudiant/${id}`, form, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

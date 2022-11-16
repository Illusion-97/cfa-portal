import axios from "axios";
import { requestOptions } from "@/_helpers/request-options.js";

const END_POINT = "/dossierProfessionnel";

export const dossierProfessionnelApi = {
  getById,
  deleteDossierProfessionnel,
  save,
  getAll,
  getByIdEtudiant,
  getByIdEtudiant2,
  saveDossierProfessionnel,
  getAllDossierProfessionnelByEtudiantAndByCursus,
  generateDossierProByStudentAndPromo,
  updateDossierProfessionnel
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
 * @param {*} id 
 * @returns 
 */
function getByIdEtudiant2(id) {
  let req = `${END_POINT}/etudiant2/${id}`;

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
function getAllDossierProfessionnelByEtudiantAndByCursus(id) {
  let req = `${END_POINT}/cursus/etudiant/${id}`;

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
function deleteDossierProfessionnel(id) {
  return axios
    .delete(`${END_POINT}/delete/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function saveDossierProfessionnel(id, form) {
  return axios
    .post(`${END_POINT}/save/etudiant/${id}`, form, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function generateDossierProByStudentAndPromo(etudiantId, promotionId) {
  let req = `${END_POINT}/dossier-professionnel/${etudiantId}/${promotionId}`;

  return axios

    // .get(req, requestOptions.headers())
    // .then(response => response.data)

    .get(req, { responseType: 'blob' })

    .then(response => {
      // const objectUrl = URL.createObjectURL(response.data);
      window.open(URL.createObjectURL(response.data));
    })

    .catch((error) => console.log(error));

}

function updateDossierProfessionnel(form, id) {
  return axios
    .put(`${END_POINT}/update/etudiant/${id}`, form,  requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
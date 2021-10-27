import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "formations";

export const formationApi = {
  getAll,
  getAllByPage,
  deleteFormation,
  getFormation,
  insertFormation,
  getFormationById,
  countFormation,
  getFormationByPromoId,
  getFormationByCursusId,
  getInterventionsByFormationId
}

function getAll() {
  return axios
    .get("/formations", requestOptions.headers())
    .then(response => response.data)
    .catch(err => console.error(err))
}

function getAllByPage(page, size, search = "") {
  let url = `/${END_POINT}/${page - 1}/${size}/${search}`;

  return axios
    .get(url, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

function getFormation(page, size) {
  const url = `/${END_POINT}/${page - 1}/${size}`;

  return axios.get(url, requestOptions.headers())
    .then(response => response.data)
    .catch(err => console.error(err))
}

function insertFormation(form) {
  const url = `/${END_POINT}`;

  return axios.post(url, form, requestOptions.headers())
    .then(response => response)
    .catch(err => console.error(err))
}

function getFormationById(id) {
  const url = `/${END_POINT}/${id}`;

  return axios.get(url, requestOptions.headers())
    .then(response => response.data)
    .catch(err => console.error(err))
}

function deleteFormation(id) { // EN STAND BY DANS LE BACKEND
  const url = `/${END_POINT}/${id}`
  return axios
    .delete(url, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function countFormation(key = "") {
  const url = `/${END_POINT}/count/${key}`;
  return axios.get(url, requestOptions.headers())
    .then(response => response.data["nb"])
    .catch(err => console.error(err))
}

function getFormationByPromoId(id){
  const url = `/${END_POINT}/getFormationByPromoId/${id}`

  return  axios
  .get(url,requestOptions.headers()) //faire la méthode pour recupérer le cursus
  .then(response =>response.data)
  .catch((error) => console.log(error))
}

function getFormationByCursusId(id){
  const url = `/${END_POINT}/getFormationByCursusId/${id}`

  return  axios
  .get(url,requestOptions.headers()) //faire la méthode pour recupérer le cursus
  .then(response =>response.data)
  .catch((error) => console.log(error))
}

function getInterventionsByFormationId(id) {
  const url = `/${END_POINT}/${id}/interventions`;

  return axios.get(url, requestOptions.headers())
    .then(response => response.data)
    .catch(err => console.error(err))
}
import axios from 'axios';
import {
  requestOptions
} from '@/_helpers/request-options.js';
export const formationApi = {
  getAllFormationsHttp,
  getAllFormationsBy,
  addFormationsHttp,
  updateFormationsHttp,
  deleteFormationsHttp,
  getFormation,

  getAllFormation,
  insertFormation,
  getFormationById,
}
const END_POINT = "formations";

async function getAllFormationsHttp() {
  let formations = [];
  const response = await axios.get(`${END_POINT}`, requestOptions.headers());
  formations = response.data;
  return formations;
}

async function getAllFormationsBy() {
  let formations = [];
  const response = await axios.get(`${END_POINT}`, requestOptions.headers());
  formations = response.data;
  return formations;
}

async function addFormationsHttp(formation) {
  let formationAdded = null;
  const response = await axios.post(
    `${END_POINT}`,
    /*
        {
            id: formation.id,
            titre: formation.titre,
            contenu: formation.contenu,
            cursus: formation.cursus,
        },*/
    formation,
    requestOptions.headers()
  );
  formationAdded = response.data;
  return formationAdded;
}

async function updateFormationsHttp(formation) {
  let formationUpdate = null;
  const response = await axios.post(
    `${END_POINT}`,
    /*
        {
            id: formation.id,
            titre: formation.titre,
            contenu: formation.contenu,
            cursus: formation.cursus,
        },*/
    formation,
    requestOptions.headers()
  );
  formationUpdate = response.data;
  return formationUpdate;
}

async function deleteFormationsHttp(id) {
  let response = null;
  response = await axios.delete(`${END_POINT}/${id}`, requestOptions.headers());
  return response.data;
}

function getFormation(page, size) {
  const url = `${process.env.VUE_APP_API_URL}/formations/${page - 1}/${size}`
  return axios.get(url)
    .then(response => response.data)
    .catch(err => console.error(err))
}

function getAllFormation() {
  const url = `${process.env.VUE_APP_API_URL}/formations`
  return axios.get(url)
    .then(response => response.data)
    .catch(err => console.error(err))
}

function insertFormation(form) {
  const url = `${process.env.VUE_APP_API_URL}/formations`
  return axios.post(url, form)
    .then(response => response)
    .catch(err => console.error(err))
}

function getFormationById(id) {
  const url = `${process.env.VUE_APP_API_URL}/formations/${id}`;
  return axios.get(url)
    .then(response => response.data)
    .catch(err => console.error(err))
}
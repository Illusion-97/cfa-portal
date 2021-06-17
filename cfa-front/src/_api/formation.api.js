import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "formations";

export const formationApi = {
  getById,
  getAllByPage,
  getCount,
  deleteFormation,
  getAllFormationsHttp,
  getAllFormationsBy,
  addFormationsHttp,
  updateFormationsHttp,
  deleteFormationsHttp,
  getFormation,
  getAllFormation,
  insertFormation,
  getFormationById,
  countFormation
}

function getById(id){
  let req = `/${END_POINT}/${id}`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
}

function getAllByPage(page, size, search = ""){
  let req = `/${END_POINT}/${page}/${size}/${search}`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
}

function getCount(search = ""){
  let req = `/${END_POINT}/count/${search}`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data["nb"])
      .catch((error) => console.log(error));
}

function deleteFormation(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

export async function getAllFormationsHttp() {
    let formations = [];
    const response = await axios.get(`${END_POINT}`, requestOptions.headers());
    formations = response.data;
    return formations;
  }
  
  export async function getAllFormationsBy() {
    let formations = [];
    const response = await axios.get(`${END_POINT}`, requestOptions.headers());
    formations = response.data;
    return formations;
  }

export async function addFormationsHttp(formation) {
  let formationAdded = null;
  const response = await axios.post(
    `${END_POINT}`,/*
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

export async function updateFormationsHttp(formation) {
  let formationUpdate = null;
  const response = await axios.post(
    `${END_POINT}`,/*
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

export async function deleteFormationsHttp(id) {
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

function countFormation() {
  const url = `${process.env.VUE_APP_API_URL}/formations/count`;
  return axios.get(url)
    .then(response => response.data["nb"])
    .catch(err => console.error(err))
}
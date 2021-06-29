import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "groupeEtudiants";

export const groupeApi = {
  getById,
  getAllByPage,
  getCount,
  save,
  deleteGroupe,

  getEtudiants,
};

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

function save(groupe) {
  return axios
    .post(`${END_POINT}`, groupe, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function deleteGroupe(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function getEtudiants(id){
  let req = `/${END_POINT}/${id}/etudiants`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
}
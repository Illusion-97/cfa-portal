import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "cursus";

export const cursusApi = {
  getAllCursus,
  addCursus,
  updateCursus,
  deleteCursus,
};

function getAllCursus() {
    return axios
      .get(`${END_POINT}`, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }

function addCursus(cursus) {
  return axios
    .post(`${END_POINT}`, cursus, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function updateCursus(cursus) {
  return axios
    .post(`${END_POINT}`, cursus, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function deleteCursus(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
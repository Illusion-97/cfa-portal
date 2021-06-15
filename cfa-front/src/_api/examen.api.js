import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "examens";

export const examenApi = {
  getAllExamens,
  addExamens,
  updateExamens,
  deleteExamens,
};

function getAllExamens() {
    return axios
      .get(`${END_POINT}`, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }


function addExamens(examen) {
  return axios
    .post(`${END_POINT}`, examen, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function updateExamens(examen) {
  return axios.post(`${END_POINT}`, examen, requestOptions.headers())
  .then((response) => response.data)
  .catch((error) => console.log(error));
}

function deleteExamens(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
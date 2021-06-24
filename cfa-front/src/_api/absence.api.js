import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "absences";

export const absencesApi = {
  getAllAbsences,
  save,
  deleteAbsence,
  countAbsence,
};

function getAllAbsences(page, size, key = "") {
  const url = `${END_POINT}/${page - 1}/${size}/${key}`
  return axios
    .get(url, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}


function save(absence) {
  return axios
    .post(`${END_POINT}`, absence, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function deleteAbsence(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function countAbsence(key = "") {
  const url = `${END_POINT}/count/${key}`
  return axios.get(url, requestOptions.headers())
    .then(response => response.data["nb"])
    .catch(err => console.error(err))
}
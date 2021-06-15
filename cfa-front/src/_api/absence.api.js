import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "absences";

export const absencesApi = {
  getAllAbsences,
  addAbsence,
  updateAbsence,
  deleteAbsence,
};

export async function getAllAbsences() {
    return axios
      .get(`${END_POINT}`, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }


export async function addAbsence(absence) {
  return axios
    .post(`${END_POINT}`, absence, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

export async function updateAbsence(absence) {
  return axios
    .post(`${END_POINT}`, absence, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

export async function deleteAbsence(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
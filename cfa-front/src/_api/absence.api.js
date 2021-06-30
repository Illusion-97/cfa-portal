import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "absences";

export const absencesApi = {
  getById,
  getAllAbsences,
  save,
  deleteAbsence,

  getAllByIdEtudiant,
};

function getById(id){
  let req = `/${END_POINT}/${id}`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
}


export async function getAllAbsences() {
    return axios
      .get(`${END_POINT}`, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }


export async function save(absence) {
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

function getAllByIdEtudiant(id) {
  let req =  `${END_POINT}/etudiant/${id}`;

  return axios
      .get(req, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));

}
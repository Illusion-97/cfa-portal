import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "absences";

export const absenceApi = {
  getById,
  getAllAbsences,
  save,
  deleteAbsence,
  getAllByIdEtudiant,
};

/**
 * Récupération des absences
 * 
 * @param {*} id 
 * @returns 
 */
function getById(id){
  let req = `/${END_POINT}/${id}`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
}

/**
 * 
 * Récupération de toutes les absences
 * 
 */

export async function getAllAbsences() {
    return axios
      .get(`${END_POINT}`, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }

  /**
 *Save d'une absence
 * 
 * @param {*} absence 
 * @returns 
 */
export async function save(absence) {
  return axios
    .post(`${END_POINT}`, absence, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * Suppression d'une absence 
 * 
 * @param {*} id 
 * @returns 
 */

export async function deleteAbsence(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 *Récupération des absences en fonction de l'id étudiant
 * 
 * @param {*} id 
 * @returns 
 */

function getAllByIdEtudiant(id) {
  let req =  `${END_POINT}/etudiant/id/${id}`;

 return axios
        .get(req, requestOptions.headers())
        .then((response) => response.data)
        .catch((error) => console.log(error));
}
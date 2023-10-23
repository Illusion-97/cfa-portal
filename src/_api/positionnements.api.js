import axios from 'axios';
import {requestOptions} from '@/_helpers/request-options.js';

const END_POINT = "positionnements";

export const positionnementApi = {
  getById,
  getAll,
  save,
  deletePositionnement,
};

/**
 * Récupération du positionnement en fonction de son id
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
 * Récupération de la liste des positionnements 
 * 
 * @returns 
 */

export async function getAll() {
    return axios
      .get(`${END_POINT}`, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }

  /**
 * Save du positionnement
 * 
 * @param {*} positionnements 
 * @returns 
 */

 function save(positionnements) {
  return axios
    .post(`${END_POINT}`, positionnements, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * Suppression du positionnement
 * 
 * @param {*} id 
 * @returns 
 */

export async function deletePositionnement(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}


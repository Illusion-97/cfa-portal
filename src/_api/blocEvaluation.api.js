import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "blocEvaluations";

export const blocEvaluationApi = {
  getByIdAtAndIdLivret,
  save,
  update,
};

/**
 * Récupération du bloc d'évaluation par id et id livret
 * 
 * @param {*} idAt 
 * @param {*} idLivret 
 * @returns 
 */

function getByIdAtAndIdLivret(idAt,idLivret) {
  return axios
    .get(`${END_POINT}/${idAt}/${idLivret}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * Save d'un bloc d'évaluation
 * 
 * @param {*} bloc 
 * @returns 
 */

function save(bloc) {
  return axios
    .post(`${END_POINT}`,bloc, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * Update d'un Bloc d'évaluation
 * 
 * @param {*} bloc 
 * @returns 
 */

function update(bloc) {
  return axios
    .put(`${END_POINT}`,bloc, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

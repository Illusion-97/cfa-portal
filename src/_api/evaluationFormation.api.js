import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "evaluationsFormations";

export const evaluationFormationApi = {

  getById,
  save,
  update,
  deleteEF,
  getAllByIdPromotionAndActiviteTypeId,
  getAllByInterventionId,
};

/**
 * Récupération des EvaluationFormation par intervention
 * 
 * @param {*} id 
 * @returns 
 */

function getAllByInterventionId(id){
  return axios
    .get(`${END_POINT}/intervention/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * Récupération des EvaluationFormation par Id
 * 
 * @param {*} id 
 * @returns 
 */

function getById(id) {
  return axios
    .get(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * Récupération des EvaluationFormation par Promotion et ActiviteType
 * 
 * @param {*} idPrmo 
 * @param {*} idAt 
 * @returns 
 */

function getAllByIdPromotionAndActiviteTypeId(idPrmo,idAt) {
  return axios
    .get(`${END_POINT}/${idPrmo}/${idAt}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * Save d'une EvaluationFormation
 * 
 * @param {*} ev 
 * @returns 
 */

function save(ev) {
  return axios
    .post(`${END_POINT}`,ev, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * Update d'une EvaluationFormation
 * 
 * @param {*} ev 
 * @returns 
 */

function update(ev) {
  return axios
    .put(`${END_POINT}`,ev, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * Delete d'une EvaluationFormation
 * 
 * @param {*} id 
 * @returns 
 */

function deleteEF(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

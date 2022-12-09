import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "livretEvaluation";

export const livretEvaluationApi = {
  getByIdEtudiantAndIdCursus,
  save,
  update,
  getlivretEtudiant,
  generer,
};
/**
 * Récupération des étudiants du groupes
 * 
 * @param {*} id 
 * @returns 
 */

function getlivretEtudiant(id){
  let req = `/${END_POINT}/etudiant/${id}`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
}
function getByIdEtudiantAndIdCursus(idEtu,idCursus) {
  return axios
    .get(`${END_POINT}/${idEtu}/${idCursus}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
function generer(idEtu,idCursus) {
  return axios
    .get(`${END_POINT}/generer/${idEtu}/${idCursus}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
function save(livret) {
  return axios
    .post(`${END_POINT}`,livret, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
function update(livret) {
  return axios
    .put(`${END_POINT}`,livret, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

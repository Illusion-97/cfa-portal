import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "livretEvaluation";

export const livretEvaluationApi = {
  getByIdEtudiantAndIdCursus,
  save,
  update,
};
function getByIdEtudiantAndIdCursus(idEtu,idCursus) {
  return axios
    .get(`${END_POINT}/${idEtu}/${idCursus}`, requestOptions.headers())
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

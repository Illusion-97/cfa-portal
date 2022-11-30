import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "evaluationsFormations";

export const evaluationFormationApi = {

  getById,
  save,
  update,
  deleteEF,
  getAllByIdPromotionAndActiviteTypeId,
};

// function getAll(){
//   return axios
//     .get(`${END_POINT}`, requestOptions.headers())
//     .then((response) => response.data)
//     .catch((error) => console.log(error));
// }



function getById(id) {
  return axios
    .get(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function getAllByIdPromotionAndActiviteTypeId(idPrmo,idAt) {
  return axios
    .get(`${END_POINT}/${idPrmo}/${idAt}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function save(ev) {
  return axios
    .post(`${END_POINT}`,ev, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
function update(ev) {
  return axios
    .put(`${END_POINT}`,ev, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
function deleteEF(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "examens";

export const examenApi = {
  getById,
  getAllByPage,
  getCount,
  save,
  deleteExamen,
  update,
  getLivretEvaluation,
  getExamensByInterventionId,
  getFileExamen,
};

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getById(id) {
  let req = `/${END_POINT}/${id}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

async  function getExamensByInterventionId(id) {
  let req = `/${END_POINT}/interventions/${id}`;
    return await  axios 
    .get(req, requestOptions.headers())
    .then(response =>  response.data)
    .catch((error) => console.log(error));
}

function getAllByPage(page, size, search = "") {
  let req = `/${END_POINT}/${page}/${size}/${search}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} search 
 * @returns 
 */
function getCount(search = "") {
  let req = `/${END_POINT}/count/${search}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data["nb"])
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} formData 
 * @returns 
 */
function save(formData) {
  return axios
    .post(`${END_POINT}`, formData, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} examenDto 
 * @returns 
 */
function update(examenDto) {
  return axios
    .put(`${END_POINT}`, examenDto)
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function deleteExamen(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getLivretEvaluation(id) {
  let req = "examens/livret-evaluation/" + id;
  return axios
  .get(req, requestOptions.headers())
  .then(response => response.data)
  .catch((error) => console.log(error));
}
/***
 * 
 */
 async function getFileExamen(id){
  let req = "examens/file/" + id;
  return  await axios
  .get(req, requestOptions.headers(),{ responseType:"arraybuffer"})
  .then(response => response.data)
  .catch((error) => console.log(error));
}
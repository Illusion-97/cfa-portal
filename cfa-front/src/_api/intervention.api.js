import axios from 'axios';
import {requestOptions} from '@/_helpers/';

const END_POINT = "interventions";

export const interventionApi = {
    getIntervention,
    getAllIntervention,
    getInterventionById,
    insertIntervention,
    countIntervention,

    getById,
    getAllByPage,
    getCount,
    save,
    updateIntervention,
    deleteIntervention,
}

function getIntervention(page, size) {
    const url = `interventions/with-object/${page - 1}/${size}`
    return axios.get(url, requestOptions.headers())
        .then(response => response.data)
        .catch(err => console.error(err));
}

function getInterventionById(id) {
    const url = `interventions/${id}`
    return axios.get(url, requestOptions.headers())
        .then(response => response.data)
        .catch(err => console.error(err));
}

function insertIntervention(form) {
    const url = `interventions/`;
    return axios.post(url, form, requestOptions.headers())
        .then(response => response)
        .catch(err => console.error(err));
}

function getAllIntervention() {
    const url = `interventions/with-object`;
    return axios.get(url, requestOptions.headers())
        .then(response => response.data)
        .catch(err => console.error(err));
}

function countIntervention() {
    const url = `interventions/count`;
    return axios.get(url, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch(err => console.error(err));
}

function getById(id){
  let req = `/${END_POINT}/${id}`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
}

function getAllByPage(page, size, search = ""){
  let req = `/${END_POINT}/${page}/${size}/${search}`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
}

function getCount(search = ""){
  let req = `/${END_POINT}/count/${search}`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data["nb"])
      .catch((error) => console.log(error));
}

function save(intervention) {
  return axios
    .post(`${END_POINT}`, intervention, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function updateIntervention(intervention) {
  return axios
    .post(`${END_POINT}`, intervention, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function deleteIntervention(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

import axios from "axios";
import { requestOptions } from "@/_helpers/request-options.js";

const END_POINT = "interventions";

export const interventionApi = {
  getById,
  getAllByPage,
  getCount,
  save,
  updateIntervention,
  deleteIntervention,
};

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

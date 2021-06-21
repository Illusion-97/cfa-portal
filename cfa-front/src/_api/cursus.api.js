import axios from "axios";
import { requestOptions } from "@/_helpers/request-options.js";

const END_POINT = "cursus";

export const cursusApi = {
  getById,
  getAllByPage,
  getCount,
  addCursus,
  updateCursus,
  deleteCursus,
  getAllCursus,
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

function addCursus(cursus) {
  return axios
    .post(`${END_POINT}`, cursus, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function updateCursus(cursus) {
  return axios
    .post(`${END_POINT}`, cursus, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function deleteCursus(id) {
  let req =  `cursus/delete/${id}`;

  return axios
      .delete(req, requestOptions.headers())
      .then((response) => response)
      .catch((error) => console.log(error));
}

function getAllCursus() {
  return axios
    .get(`${END_POINT}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

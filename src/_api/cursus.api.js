import axios from "axios";
import { requestOptions } from "@/_helpers/request-options.js";

const END_POINT = "cursus";

export const cursusApi = {
  getById,
  getAllByPage,
  getCount,
  save,
  deleteCursus,
  getAllCursus,
  getByIdEtudiant,
  getCurrentCursusByIdEtudiant,
  getPromotionsById,
};

function getById(id){
  let req = `/${END_POINT}/${id}`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
}
function getByIdEtudiant(id){
  let req = `/${END_POINT}/etudiant/${id}`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
}
function getCurrentCursusByIdEtudiant(id){
  let req = `/${END_POINT}/CurrentCursus/${id}`;

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

function save(cursus) {
  return axios
    .post(`${END_POINT}`, cursus, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function deleteCursus(id) {
  let req =  `cursus/${id}`;

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


function getPromotionsById(id) {
  return axios
    .get(`${END_POINT}/${id}/promotions`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

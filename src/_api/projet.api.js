import axios from "axios";
import { requestOptions } from "@/_helpers/request-options.js";

const END_POINT = "projets";

export const projetApi = {
  getById,
  getAllByPage,
  getCount,
  save,
  deleteProjet,
  getByIdEtudiant,
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

function save(projet) {
  return axios
    .post(`${END_POINT}`, projet, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function deleteProjet(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

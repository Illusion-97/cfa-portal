import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "ficheEntreprises";

export const ficheEntrepriseApi = {
  getById,
  getAllByPage,
  getCount,
  save,
  deleteFicheEntreprise,
  getAll,
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

function save(form) {
  return axios
    .post(`/${END_POINT}`, form, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function deleteFicheEntreprise(id) {
  return axios
    .delete(`/${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function getAll(){
  let req = `/ficheEntreprises`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
}
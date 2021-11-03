import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';
//import handleResponse from '@/_helpers/handle-response.js';

export const entrepriseApi = {
    getById,
    getAllByPage,
    getCount,
    save,
    deleteEntreprise,
    getAllEntreprises,
    getAll,
}

const END_POINT = "entreprises";

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


function getAllEntreprises() {
    return axios
      .get(`${END_POINT}`, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }

function getCount(search = ""){
    let req = `/${END_POINT}/count/${search}`;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch((error) => console.log(error));
}

function save(entreprise) {
  return axios
    .post(`/${END_POINT}`, entreprise, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function deleteEntreprise(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function getAll(){
  let req = `/entreprises`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
}

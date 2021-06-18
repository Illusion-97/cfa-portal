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
}

const END_POINT = "entreprises";

function getById(id){
    let req = `/entreprises/${id}`;

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
    let req = `/entreprises/count/${search}`;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch((error) => console.log(error));
}


function save(form) {
    let req =  "entreprises";

    return axios
        .post(req, form, requestOptions.headers())
        .then((response) => response)
        .catch((error) => console.log(error));

}

function deleteEntreprise(id) {
    let req =  `entreprises/${id}`;

    return axios
        .delete(req, requestOptions.headers())
        .then((response) => response)
        .catch((error) => console.log(error));

}
import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';
//import handleResponse from '@/_helpers/handle-response.js';

export const adresseApi = {
    getById,
    getAllByPage,
    getCount,
    save,
    deleteAdresse,
    getAllAdresses,
}

const END_POINT = "adresses";

function getById(id){
    let req = `/adresses/${id}`;

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


function getAllAdresses() {
    return axios
      .get(`${END_POINT}`, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }

function getCount(search = ""){
    let req = `/adresses/count/${search}`;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch((error) => console.log(error));
}


function save(form) {
    let req =  "adresses";

    return axios
        .post(req, form, requestOptions.headers())
        .then((response) => response)
        .catch((error) => console.log(error));

}

function deleteAdresse(id) {
    let req =  `adresses/${id}`;

    return axios
        .delete(req, requestOptions.headers())
        .then((response) => response)
        .catch((error) => console.log(error));

}
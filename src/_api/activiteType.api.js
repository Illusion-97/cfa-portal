import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "activiteTypes";

export const activiteTypeApi = {
  getAll,
  getAllByIdPromotion,
  getById,
  getActiviteTypesByCursus
};

function getAll(){
  return axios
    .get(`${END_POINT}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function getAllByIdPromotion(id){

    let req = `/${END_POINT}/promotion/${id}`;
    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error)); 
}

function getById(id) {
  return axios
    .get(`${END_POINT}/${id}/promotions`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function getActiviteTypesByCursus(id){

  let req = `/${END_POINT}/cursus/${id}`;
  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error)); 
}
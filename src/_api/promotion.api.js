import axios from 'axios';
import { requestOptions } from "@/_helpers/request-options.js";

export const promotionApi = {
    getPromotionByid,
    getAllByPage,
    getCount,
    save,
    deletePromotion,
    getAllPromotions,

    getAll,
    getEtudiants,
    getNote,
    getCours,
};

const END_POINT = "promotions";

function getPromotionByid(id){
    let req =  `/promotions/${id}`;

  return axios
    .get(req, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function getAllByPage(page, size, search = ""){
  let req = `/promotions/${page}/${size}/${search}`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
}

function getCount(search = ""){
  let req = `/promotions/count/${search}`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data["nb"])
      .catch((error) => console.log(error));
}

function save(form) {
  let req =  "promotions";

  return axios
      .post(req, form, requestOptions.headers())
      .then((response) => response)
      .catch((error) => console.log(error));

}
function getAllPromotions() {
  return axios
    .get(`${END_POINT}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function deletePromotion(id) {
  let req =  `promotions/${id}`;

  return axios
      .delete(req, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));

}


function getEtudiants(id) {
  let req =  `promotions/${id}/etudiants`;

  return axios
      .get(req, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));

}
function getNote(id) {
  let req =  `promotions/${id}/notes`;

  return axios
      .get(req, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));

}
function getCours(id) {
  let req =  `promotions/${id}/interventions`;

  return axios
      .get(req, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));

}

function getAll(){
  let req = `/promotions`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
}
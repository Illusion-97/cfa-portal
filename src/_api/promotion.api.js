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
    getCef,
    getPromotionByEtudiantIdAndByCursusId,
    getCursusByIdEtudiant,
    getAllByInterventionIdForSelect,
    getGrillePositionnement,
};

const END_POINT = "promotions";

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getPromotionByid(id){
    let req =  `/promotions/${id}`;

  return axios
    .get(req, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} page 
 * @param {*} size 
 * @param {*} search 
 * @returns 
 */
function getAllByPage(page, size, search = ""){
  let req = `/promotions/${page}/${size}/${search}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} search 
 * @returns 
 */
function getCount(search = ""){
  let req = `/promotions/count/${search}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data["nb"])
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} form 
 * @returns 
 */
function save(form) {
  let req = "promotions";

  return axios
      .post(req, form, requestOptions.headers())
      .then((response) => response)
      .catch((error) => console.log(error));
}

/**
 * 
 * @returns 
 */
function getAllPromotions() {
  return axios
    .get(`${END_POINT}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function deletePromotion(id) {
  let req = `promotions/${id}`;

  return axios
      .delete(req, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getEtudiants(id) {
  let req = `promotions/${id}/etudiants`;

  return axios
      .get(req, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getNote(id) {
  let req = `promotions/${id}/notes`;

  return axios
      .get(req, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getCours(id) {
  let req = `promotions/${id}/interventions`;

  return axios
      .get(req, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));
}

/**
 * 
 * @returns 
 */
function getAll(){
  let req = `/promotions`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getCef(id){
  let req = `promotions/${id}/cefs`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getPromotionByEtudiantIdAndByCursusId(id){
  let req = `promotions/${id}/etudiants/cursus`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getCursusByIdEtudiant(id){
  let req = `promotions/cursus-etudiant/${id}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}
function getAllByInterventionIdForSelect(idI){
  let req = `promotions/intervention-select/${idI}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
   
}
async function getGrillePositionnement(id){
  let req = "promotions/grillePositionnement/" + id;
  return  await axios
  .get(req, requestOptions.headers(),{ responseType:"blob"})
  .then(response => response.data)
  .catch((error) => console.log(error));
}
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

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getById(id){
  let req = `/${END_POINT}/${id}`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getByIdEtudiant(id){
  let req = `/${END_POINT}/etudiant/${id}`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getCurrentCursusByIdEtudiant(id){
  let req = `/${END_POINT}/CurrentCursus/${id}`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
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
  let req = `/${END_POINT}/${page}/${size}/${search}`;

  return  axios
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
  let req = `/${END_POINT}/count/${search}`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data["nb"])
      .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} cursus 
 * @returns 
 */
function save(cursus) {
  return axios
    .post(`${END_POINT}`, cursus, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function deleteCursus(id) {
  let req =  `cursus/${id}`;

  return axios
      .delete(req, requestOptions.headers())
      .then((response) => response)
      .catch((error) => console.log(error));
}

/**
 * 
 * @returns 
 */
function getAllCursus() {
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
function getPromotionsById(id) {
  return axios
    .get(`${END_POINT}/${id}/promotions`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} logInUser 
 * @returns 
 */
/* test de recup de la requete import dg2 */
export async function fetchAllCursusDG2Http(logInUser) {
  return await axios.get(`${process.env.VUE_APP_BASE_URL}${END_POINT}/dg2`, {
    headers: {
      Authorization: requestOptions.headers(),
      "X-AUTH-TOKEN": `${logInUser.email}:${logInUser.password}`,
    },
  });
}

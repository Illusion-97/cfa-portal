import axios from 'axios';
import {requestOptions} from '@/_helpers/request-options.js';
//import store from '@/store/store.js';

const END_POINT = "centreFormations";

export const centreFormationApi = {
  getById,
  getAllCentreFormations,
  addCentreFormations,
  save,
  deleteCentreFormations,
  getAllByPage,
  getCount,
  fetchAllCentreDeFormationsDG2Http

};

/**
 *Récupération du centre par id
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
 * Récupération de tous les centres
 * 
 */

function getAllCentreFormations() {
    return axios
      .get(`${END_POINT}`, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
  }

  /**
 * Récuparation des centres avec pagination + recherche
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
 * Ajout du centre
 * 
 * @param {*} centreFormation 
 * @returns 
 */

function addCentreFormations(centreFormation) {
  return axios
    .post(`${END_POINT}`, centreFormation, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * Mise à jour du centre 
 * 
 * @param {*} centreFormation
 * @returns 
 */

function save(centreFormation) {
  let req = "centreFormations";
  return axios
    .post(req, centreFormation, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * suppression du centre
 * 
 * @param {*} id 
 * @returns 
 */

function deleteCentreFormations(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * methode de recherche du centre
 * 
 * @param {*} id 
 * @returns 
 */

function getCount(search = ""){
  let req = `/centreFormations/count/${search}`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data["nb"])
      .catch((error) => console.log(error));
}

/**
 * Récupération des centres de DG2
 * 
 * @param {*} logInUser (id user)
 * @returns Liste des centres de dawan
 */
function fetchAllCentreDeFormationsDG2Http(logInUser) {

  let headers = requestOptions.headers();

  let req = `/${END_POINT}/dg2`;

  headers.headers["X-AUTH-TOKEN"] = `${logInUser.logInUser.email}:${logInUser.logInUser.password}`;

  return axios.get(req, headers);
  
}
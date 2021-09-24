import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "centreFormations";

export const centreFormationApi = {
  getById,
  getAllCentreFormations,
  addCentreFormations,
  save,
  deleteCentreFormations,
  getAllByPage,
  getCount,

};

function getById(id){
  let req = `/${END_POINT}/${id}`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
}

function getAllCentreFormations() {
    return axios
      .get(`${END_POINT}`, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }

  function getAllByPage(page, size, search = ""){
    let req = `/${END_POINT}/${page}/${size}/${search}`;
  
    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
  }

function addCentreFormations(centreFormation) {
  return axios
    .post(`${END_POINT}`, centreFormation, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function save(centreFormation) {
  let req = "centreFormations";
  return axios
    .post(req, centreFormation, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function deleteCentreFormations(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
function getCount(search = ""){
  let req = `/centreFormations/count/${search}`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data["nb"])
      .catch((error) => console.log(error));
}
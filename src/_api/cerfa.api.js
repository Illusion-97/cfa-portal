import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "cerfa";

export const cerfaApi = {
  getById,
  save,
  deleteCerfa,
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

  function getAllByPage(page, size, search = ""){
    let req = `/${END_POINT}/${page}/${size}/${search}`;
  
    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
  }

function save(cerfa) {
  return axios
    .post(cerfa, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function deleteCerfa(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
function getCount(search = ""){
  let req = `/cerfa/count/${search}`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data["nb"])
      .catch((error) => console.log(error));
}
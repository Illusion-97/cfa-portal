import axios from "axios";
import { requestOptions } from "@/_helpers/request-options.js";

const END_POINT = "devoirs";

export const devoirApi = {
  getById,
  getAllByPage,
  getCount,
  save,
  deleteDevoir,
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

function getCount(search = ""){
  let req = `/${END_POINT}/count/${search}`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data["nb"])
      .catch((error) => console.log(error));
}

function save(devoir) {
  return axios
    .post(`${END_POINT}`, devoir, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function deleteDevoir(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

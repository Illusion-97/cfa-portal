import axios from "axios";
import { requestOptions } from "@/_helpers/request-options.js";

const END_POINT = "devoirs";

export const devoirApi = {
  getAllDevoirs,
  addDevoirs,
  updateDevoirs,
  deleteDevoirs,
};

function getAllDevoirs() {
  return axios
    .get(`${END_POINT}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function addDevoirs(devoir) {
  return axios
    .post(`${END_POINT}`, devoir, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function updateDevoirs(devoir) {
  return axios
    .post(`${END_POINT}`, devoir, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function deleteDevoirs(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

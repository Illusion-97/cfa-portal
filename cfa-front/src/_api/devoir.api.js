import axios from "axios";
import { requestOptions } from "@/_helpers/request-options.js";

const END_POINT = "devoirs";

export const devoirApi = {
  getAllDevoirs,
  addDevoir,
  updateDevoir,
  deleteDevoir,
};

function getAllDevoirs() {
  return axios
    .get(`${END_POINT}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function addDevoir(devoir) {
  return axios
    .post(`${END_POINT}`, devoir, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function updateDevoir(devoir) {
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

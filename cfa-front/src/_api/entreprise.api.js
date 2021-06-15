import axios from "axios";
import { requestOptions } from "@/_helpers/request-options.js";

const END_POINT = "entreprises";

export const entrepriseApi = {
  getAllEntreprises,
  addEntreprise,
  updateEntreprise,
  deleteEntreprise,
};

function getAllEntreprises() {
  return axios
    .get(`${END_POINT}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function addEntreprise(entreprise) {
  return axios
    .post(`${END_POINT}`, entreprise, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function updateEntreprise(entreprise) {
  return (
    axios.post()`${END_POINT}`,
    entreprise,
    requestOptions
      .headers()
      .then((response) => response.data)
      .catch((error) => console.log(error))
  );
}

function deleteEntreprise(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

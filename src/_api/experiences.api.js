import axios from "axios";
import { requestOptions } from "@/_helpers/request-options.js";

const END_POINT = "/experiences";

export const experiencesApi = {
  deleteById,
  update,
}

/**
 * Suppression d'une experiences 
 * 
 * @param {*} id 
 * @returns 
 */

function deleteById(id) {
    return axios
      .delete(`${END_POINT}/${id}`, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }

/**
 * Update d'une absence
 * 
 * @param {*} absence 
 * @returns 
 */

function update(form) {
  return axios
    .put(`${END_POINT}`, form,  requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

